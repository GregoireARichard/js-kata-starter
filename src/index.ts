//types
type Operator = "+" | "-" | "*" | "/" | "MOD";
type UnaryOperator = "NEGATE";

//utils
function isOperator(token: string): token is Operator {
  return token === "+" || token === "-" || token === "*" || token === "/" || token === "MOD";
}

function isUnaryOperator(token: string): token is UnaryOperator {
  return token === "NEGATE";
}

function performBinaryOperation(operator: Operator, operand1: number, operand2: number): number {
if (operator === "/" && operand2 === 0) {
    throw new Error("Division par zéro impossible");
    }
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
    case "MOD":
      return operand1 % operand2;
    default:
      throw new Error(`operateur binaire inconnu: ${operator}`);
  }
}

function performUnaryOperation(operator: UnaryOperator, operand: number): number {
  switch (operator) {
    case "NEGATE":
      return -operand;
    default:
      throw new Error(`operateur unaire iconnu: ${operator}`);
  }
}

//domain

function rpn(expression: string): number {
    // On sépare les éléments de l'expression en utilisant l'espace comme séparateur
    const tokens = expression.trim().split(" ");
    const stack: number[] = [];
  
    for (const token of tokens) {
      if (isOperator(token)) {
        // On récupère les deux opérandes du sommet de la pile
        const operand2 = stack.pop();
        const operand1 = stack.pop();
        if (operand1 === undefined || operand2 === undefined) {
            // On lance une erreur si le nombre d'opérandes est insuffisant
          throw new Error("Expression RPN invalide : opérandes insuffisants");
        }
        // On effectue l'opération binaire avec l'opérateur et les opérandes récupérés
        const result = performBinaryOperation(token, operand1, operand2);
        // On empile le résultat obtenu
        stack.push(result);
      } else if (isUnaryOperator(token)) {
        // On récupère l'opérande du sommet de la pile
        const operand = stack.pop();
        if (operand === undefined) {
            // On lance une erreur si l'opérande est manquant
          throw new Error("Expression RPN invalide : opérandes insuffisants");
        }
        // On effectue l'opération unaire avec l'opérateur et l'opérande récupérés
        const result = performUnaryOperation(token, operand);
        // On empile le résultat obtenu
        stack.push(result);
      } else {
        // Si le token est un nombre, on le convertit en flottant et on l'empile
        const operand = parseFloat(token);
        if (isNaN(operand)) {
            // On lance une erreur si le token n'est pas un nombre valide
          throw new Error(`token invalide: ${token}`);
        }
        stack.push(operand);
      }
    }
  
    if (stack.length !== 1) {
        // On lance une erreur s'il reste un nombre incorrect d'opérandes dans la pile
      throw new Error("Expression RPN invalide : trop d'opérandes");
    }
    // On retourne le résultat final qui se trouve au sommet de la pile
    return stack[0];
  }

  export default rpn;