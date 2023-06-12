// Types
type Operator = "+" | "-" | "*" | "/" | "MOD";
type UnaryOperator = "NEGATE";

// Vérifie si le token est un opérateur binaire valide
function isOperator(token: string): token is Operator {
  return token === "+" || token === "-" || token === "*" || token === "/" || token === "MOD";
}

// Vérifie si le token est un opérateur unaire valide
function isUnaryOperator(token: string): token is UnaryOperator {
  return token === "NEGATE";
}

// Effectue l'opération binaire correspondant à l'opérateur
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
      throw new Error(`opérateur binaire inconnu : ${operator}`);
  }
}

// Effectue l'opération unaire correspondant à l'opérateur
function performUnaryOperation(operator: UnaryOperator, operand: number): number {
  switch (operator) {
    case "NEGATE":
      return -operand;
    default:
      throw new Error(`opérateur unaire inconnu : ${operator}`);
  }
}

// Fonction principale RPN
function rpn(expression: string): number {
  const tokens = expression.trim().split(" ");
  const stack: number[] = [];

  for (const token of tokens) {
    if (isOperator(token)) {
      performBinaryOperationOnStack(stack, token);
    } else if (isUnaryOperator(token)) {
      performUnaryOperationOnStack(stack, token);
    } else {
      pushOperandToStack(stack, token);
    }
  }

  if (stack.length !== 1) {
    throw new Error("Expression RPN invalide : trop d'opérandes");
  }

  return stack[0];
}

// Effectue l'opération binaire avec l'opérateur et les opérandes récupérés et empile le résultat
function performBinaryOperationOnStack(stack: number[], operator: Operator): void {
  const operand2 = stack.pop();
  const operand1 = stack.pop();

  if (operand1 === undefined || operand2 === undefined) {
    throw new Error("Expression RPN invalide : opérandes insuffisants");
  }

  const result = performBinaryOperation(operator, operand1, operand2);
  stack.push(result);
}

// Effectue l'opération unaire avec l'opérateur et l'opérande récupérés et empile le résultat
function performUnaryOperationOnStack(stack: number[], operator: UnaryOperator): void {
  const operand = stack.pop();

  if (operand === undefined) {
    throw new Error("Expression RPN invalide : opérandes insuffisants");
  }

  const result = performUnaryOperation(operator, operand);
  stack.push(result);
}

// Convertit le token en flottant et l'empile sur la pile
function pushOperandToStack(stack: number[], token: string): void {
  const operand = parseFloat(token);

  if (isNaN(operand)) {
    throw new Error(`token invalide : ${token}`);
  }

  stack.push(operand);
}

export default rpn;
