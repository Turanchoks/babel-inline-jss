const babel = require('@babel/core');
const assert = require('assert');
const { default: generate } = require('@babel/generator');

const classesTraversal = {
  enter(path, { classesNodes, classesVarName, classesDeclarationNode }) {
    if (
      // we look for a path that is an identifier with "classes" name
      path.isIdentifier({ name: classesVarName }) &&
      // and is not a declaration of the "classes"
      path.node !== classesDeclarationNode.id &&
      // and is actually desired "classes" from the scope we need
      path.scope.getBindingIdentifier(classesVarName) ===
        classesDeclarationNode.id
    ) {
      classesNodes.add(path);
    }
  },
};

const plugin = (
  { types: t },
  { jss, theme, functionName, attachStylesFunctionName } = {}
) => {
  // for example, __jss is functionName
  // attachStylesFunctionName is __attachStyles is functionName
  assert(jss, 'jss is not provided');
  assert(theme, 'theme is not provided');
  assert(functionName, 'functionName is not provided');
  assert(attachStylesFunctionName, 'attachStylesFunctionName is not provided');
  return {
    visitor: {
      CallExpression(path) {
        if (
          // check if the callee is __jss
          t.isIdentifier(path.node.callee, {
            name: functionName,
          }) &&
          // check if callee is __jss
          path.scope.hasGlobal(functionName)
        ) {
          // get node for __jss argument
          const [getterAST] = path.node.arguments;
          // assert that it's an arrow function
          t.assertArrowFunctionExpression(getterAST);
          // convert the arrow function to actual code
          const { code: getterCode } = generate(getterAST);
          // and eval it. A function is returned
          const getterFn = eval(getterCode);
          // get a part of the theme with the function
          const result = getterFn(theme);
          // generate styles
          const sheet = jss.createStyleSheet(result);

          // get parent node
          const classesDeclarationNode = path.parent;
          // which must be a variable declarator
          t.assertVariableDeclarator(classesDeclarationNode);
          // get a name of the declarator (usually "classes")
          const classesVarName = classesDeclarationNode.id.name;
          // find the closest scope
          const nearestScope = path.findParent(path => path.isScope());

          // set that contains all the nodes with "classes" usage
          const classesNodes = new Set();

          // traverse nearest scope in the search of "classes" usage
          nearestScope.traverse(classesTraversal, {
            classesNodes,
            classesVarName,
            classesDeclarationNode,
          });

          // for all "classes" nodes
          for (const el of classesNodes) {
            // assert that its parent is a non-computed member expression (a.b)
            t.assertMemberExpression(el.parent, {
              computed: false,
            });

            // get the name of the property (classes.button => button)
            const className = el.parent.property.name;
            // and make sure there is a corresponding classname
            assert(sheet.classes[className], `${className} not found in sheet`);

            // replace "classes.className" with actual class name
            el.parentPath.replaceWith(
              t.stringLiteral(sheet.classes[className])
            );
          }

          // find classes declaration (const clasess = __jss(theme => theme.button))
          const variableDeclarator = path.findParent(path =>
            path.isVariableDeclarator()
          );
          // and remove it
          variableDeclarator.remove();

          // get parent scope
          const programScope = path.scope.getProgramParent();
          // and attach __attachStyles with css string to the end of the program
          programScope.path.node.body.push(
            t.callExpression(t.identifier(attachStylesFunctionName), [
              t.stringLiteral(sheet.toString()),
            ])
          );
        }
      },
    },
  };
};

module.exports = plugin;
