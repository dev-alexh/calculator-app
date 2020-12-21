import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { create, all } from 'mathjs';

const math = create(all);

export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "0",
            operation: "",
            display: "0",
            actualCalc: "0"
        };

        this.constructNum = this.constructNum.bind(this);
        this.clear = this.clear.bind(this);
        this.mathOperation = this.mathOperation.bind(this);
        this.decimalNum = this.decimalNum.bind(this);
        this.resultCalculation = this.resultCalculation.bind(this);
    }

    constructNum(event) {
        const inputStr = event.target.value;

        this.setState((state) => {
            if (state.operation != "") {
                const operArr = state.operation.split("");
                if (operArr.length > 1) {
                    if (operArr[operArr.length - 1] == "-") {
                        return {
                            number: inputStr,
                            operation: "",
                            display: state.display + inputStr,
                            actualCalc:
                                state.actualCalc +
                                operArr[operArr.length - 2] +
                                operArr[operArr.length - 1] +
                                inputStr
                        };
                    } else {
                        return {
                            number: inputStr,
                            operation: "",
                            display: state.display + inputStr,
                            actualCalc:
                                state.actualCalc + operArr[operArr.length - 1] + inputStr
                        };
                    }
                } else {
                    return {
                        number: inputStr,
                        operation: "",
                        display: state.display + inputStr,
                        actualCalc: state.actualCalc + state.operation + inputStr
                    };
                }
            }
            if (state.number == "0") {
                if (inputStr !== "0") {
                    return {
                        number: inputStr,
                        operation: "",
                        display: state.display.substring(0, state.display.length - 1) + inputStr,
                        actualCalc: state.actualCalc + inputStr
                    };
                }
            } else {
                return {
                    number: state.number + inputStr,
                    operation: "",
                    display: state.display + inputStr,
                    actualCalc: state.actualCalc + inputStr
                };
            }
        });
    }

    clear() {
        this.setState({
            number: "0",
            operation: "",
            display: "0",
            actualCalc: "0"
        });
    }

    mathOperation(event) {
        const inputOperation = event.target.value;
        this.setState((state) => {
            if (state.operation == "") {
                return {
                    number: "",
                    operation: inputOperation,
                    display: state.display + inputOperation,
                    actualCalc: state.actualCalc
                };
            } else {
                return {
                    number: "",
                    operation: state.operation + inputOperation,
                    display: state.display + inputOperation,
                    actualCalc: state.actualCalc
                };
            }
        });
    }

    decimalNum() {
        this.setState((state) => {
            if (!state.number.includes(".")) {
                if (state.operation != "") {
                    const operArr = state.operation.split("");
                    if (operArr.length > 1) {
                        if (operArr[operArr.length - 1] == "-") {
                            return {
                                number: state.number + ".",
                                operation: "",
                                display: state.display + ".",
                                actualCalc:
                                    state.actualCalc +
                                    operArr[operArr.length - 2] +
                                    operArr[operArr.length - 1] +
                                    "."
                            };
                        } else {
                            return {
                                number: state.number + ".",
                                operation: "",
                                display: state.display + ".",
                                actualCalc:
                                    state.actualCalc + operArr[operArr.length - 1] + "."
                            };
                        }
                    } else {
                        return {
                            number: state.number + ".",
                            operation: "",
                            display: state.display + ".",
                            actualCalc: state.actualCalc + state.operation + "."
                        };
                    }
                }

                else {
                    return {
                        number: state.number + ".",
                        operation: "",
                        display: state.display + ".",
                        actualCalc: state.actualCalc + "."
                    };
                }
            }
        });
    }

    resultCalculation() {
        this.setState((state) => {
            if (state.actualCalc !== "" && !state.actualCalc.endsWith(".")) {
                const result = math.evaluate(state.actualCalc).toString();
                return {
                    number: result,
                    operation: "",
                    display: result,
                    actualCalc: result
                };
            }
        });
    }

    render() {
        const createButtonRow = (array) => {
            if (array.length == 4) {
                return array.map((element, index) => (
                    <Col xs={3} key={element.elemDisplay}>
                        <Button
                            id={element.elemId}
                            value={element.elemDisplay}
                            onClick={element.elemClick}
                            block
                        >
                            {element.elemDisplay}
                        </Button>
                    </Col>
                ));
            } else {
                return array.map((element, index) => (
                    <Col xs={12} key={element.elemDisplay}>
                        <Button
                            id={element.elemId}
                            value={element.elemDisplay}
                            onClick={element.elemClick}
                            block
                        >
                            {element.elemDisplay}
                        </Button>
                    </Col>
                ));
            }
        };

        return (
            <Container>
                <h1> Complicated Calculator </h1>
                <Container fluid id="calculator-box">
                    <Row className="mb-4" id="displayScreen">
                        <Col xs={12}>
                            <p id="displayOperations">{this.state.display}</p>
                            <p id="display">
                                {this.state.number ? this.state.number : this.state.operation}
                            </p>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        {createButtonRow([
                            {
                                elemDisplay: "7",
                                elemId: "seven",
                                elemClick: this.constructNum
                            },
                            {
                                elemDisplay: "8",
                                elemId: "eight",
                                elemClick: this.constructNum
                            },
                            {
                                elemDisplay: "9",
                                elemId: "nine",
                                elemClick: this.constructNum
                            },
                            { elemDisplay: "+", elemId: "add", elemClick: this.mathOperation }
                        ])}
                    </Row>
                    <Row className="mb-4">
                        {createButtonRow([
                            {
                                elemDisplay: "4",
                                elemId: "four",
                                elemClick: this.constructNum
                            },
                            {
                                elemDisplay: "5",
                                elemId: "five",
                                elemClick: this.constructNum
                            },
                            { elemDisplay: "6", elemId: "six", elemClick: this.constructNum },
                            {
                                elemDisplay: "-",
                                elemId: "subtract",
                                elemClick: this.mathOperation
                            }
                        ])}
                    </Row>
                    <Row className="mb-4">
                        {createButtonRow([
                            { elemDisplay: "1", elemId: "one", elemClick: this.constructNum },
                            { elemDisplay: "2", elemId: "two", elemClick: this.constructNum },
                            {
                                elemDisplay: "3",
                                elemId: "three",
                                elemClick: this.constructNum
                            },
                            {
                                elemDisplay: "*",
                                elemId: "multiply",
                                elemClick: this.mathOperation
                            }
                        ])}
                    </Row>
                    <Row className="mb-4">
                        {createButtonRow([
                            {
                                elemDisplay: "0",
                                elemId: "zero",
                                elemClick: this.constructNum
                            },
                            {
                                elemDisplay: ".",
                                elemId: "decimal",
                                elemClick: this.decimalNum
                            },
                            { elemDisplay: "CE", elemId: "clear", elemClick: this.clear },
                            {
                                elemDisplay: "/",
                                elemId: "divide",
                                elemClick: this.mathOperation
                            }
                        ])}
                    </Row>
                    <Row className="mb-4">
                        {createButtonRow([
                            {
                                elemDisplay: "=",
                                elemId: "equals",
                                elemClick: this.resultCalculation
                            }
                        ])}
                    </Row>
                    <footer>
                        <p> Alex H, 2020. freeCodeCamp</p>
                    </footer>
                </Container>
            </Container>
        );
    }
}