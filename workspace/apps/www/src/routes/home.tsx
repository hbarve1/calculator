/**
 * This is the main page of the app.
 * Building and calculator application in react.js
 */

import React, { useEffect } from 'react';
import classnames from 'classnames';

function Input({ value }: { value: string }) {
  return (
    <input
      value={value || '0'}
      disabled
      className="h-28 w-full rounded-2xl bg-gray-200 p-4 text-right text-xl font-bold"
    />
  );
}

function Button({
  children,
  onClick,
  className,
  disabled,
  ...rest
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={classnames(
        'm-[1px] flex-1 rounded-full p-4 text-xl drop-shadow-sm hover:drop-shadow-2xl',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
// BODMAS
// bracket
// order
// division
// multiplication
// addition
// subtraction

enum OperationType {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  MODULUS = '%',
}

function operationFn(
  leftValue: number,
  operation: OperationType,
  rightValue: number
) {
  switch (operation) {
    case OperationType.ADD:
      return leftValue + rightValue;
    case OperationType.SUBTRACT:
      return leftValue - rightValue;
    case OperationType.MULTIPLY:
      return leftValue * rightValue;
    case OperationType.DIVIDE:
      if (rightValue === 0) {
        return 0;
      }
      return leftValue / rightValue;
    case OperationType.MODULUS:
      if (rightValue === 0) {
        return 0;
      }
      return leftValue % rightValue;
    default:
      return 0;
  }
}

function isOperationButtonDisabled(val: string): boolean {
  if (val.length < 1) {
    return true;
  }

  if (val.length > 3) {
    const lastThreeCharSubstring = val.slice(val.length - 2).trim();

    // console.log('lastThreeCharSubstring', lastThreeCharSubstring.split(''));
    // console.log('OperationType', Object.values(OperationType));

    // console.log(
    //   'find operator',
    //   lastThreeCharSubstring
    //     .split('')
    //     .findIndex(
    //       (c) =>
    //         c === OperationType.ADD ||
    //         c === OperationType.SUBTRACT ||
    //         c === OperationType.MULTIPLY ||
    //         c === OperationType.DIVIDE ||
    //         c === OperationType.MODULUS
    //     )
    // );

    return (
      lastThreeCharSubstring
        .split('')
        .findIndex(
          (c) =>
            c === OperationType.ADD ||
            c === OperationType.SUBTRACT ||
            c === OperationType.MULTIPLY ||
            c === OperationType.DIVIDE ||
            c === OperationType.MODULUS
        ) > -1
    );
  }

  return false;
}

export function Home() {
  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState('0');

  const onClick = (v: string) => {
    return () => {
      setValue(value + v);

      console.log(isOperationButtonDisabled(value + v));
    };
  };

  function calculate2(str: string) {
    const tokens = str.split(' ');
    console.log('tokens', tokens);

    while (tokens.length > 1) {
      const index = tokens.findIndex((token) => token === '/' || token === '%');

      if (index > -1) {
        const leftValue = parseFloat(tokens[index - 1]);
        const rightValue = parseFloat(tokens[index + 1]);
        const operation = tokens[index] as OperationType;

        if (leftValue !== undefined && rightValue !== undefined) {
          const result = operationFn(leftValue, operation, rightValue);
          tokens.splice(index - 1, 3, result.toString());
        }
      } else {
        const index = tokens.findIndex((token) => token === '*');

        if (index > -1) {
          const leftValue = parseFloat(tokens[index - 1]);
          const rightValue = parseFloat(tokens[index + 1]);
          const operation = tokens[index] as OperationType;

          if (leftValue !== undefined && rightValue !== undefined) {
            const result = operationFn(leftValue, operation, rightValue);
            tokens.splice(index - 1, 3, result.toString());
          }
        } else {
          const index = tokens.findIndex((token) => token === '+');

          if (index > -1) {
            const leftValue = parseFloat(tokens[index - 1]);
            const rightValue = parseFloat(tokens[index + 1]);
            const operation = tokens[index] as OperationType;

            if (leftValue !== undefined && rightValue !== undefined) {
              const result = operationFn(leftValue, operation, rightValue);
              tokens.splice(index - 1, 3, result.toString());
            }
          } else {
            const index = tokens.findIndex((token) => token === '-');

            if (index > -1) {
              const leftValue = parseFloat(tokens[index - 1]);
              const rightValue = parseFloat(tokens[index + 1]);
              const operation = tokens[index] as OperationType;

              if (leftValue !== undefined && rightValue !== undefined) {
                const result = operationFn(leftValue, operation, rightValue);
                tokens.splice(index - 1, 3, result.toString());
              }
            }
          }
        }
      }
    }
    if (tokens.length === 1) {
      return tokens[0];
    }

    return 'Invalid Input';
  }

  function onClickEqual() {
    const result = calculate2(value);
    setResult(result);
  }

  return (
    <div className="flex h-full items-center justify-center shadow-xl">
      <div className="flex h-full w-full flex-col justify-end bg-gray-200 p-4 sm:h-2/3 sm:w-2/3 sm:rounded-xl">
        <Input value={value} />
        <div className="flex-grow" />
        <p className="flex h-28 w-full items-center justify-end rounded-2xl bg-gray-200 p-4 text-right text-xl font-bold">
          {result}
        </p>
        <div className="flex flex-col ">
          <div className="mt-2 flex">
            {/* <Button onClick={() => {}} className="">
              %
            </Button> */}
            <Button onClick={() => setValue('')} className="w-1/2 flex-auto">
              AC
            </Button>
            <Button
              onClick={() => setValue(value + ' % ')}
              className="w-1/4 flex-auto "
              disabled={isOperationButtonDisabled(value)}
            >
              %
            </Button>
            <Button
              onClick={() => setValue(value + ' / ')}
              className="w-1/4 flex-auto "
              disabled={isOperationButtonDisabled(value)}
            >
              /
            </Button>
          </div>
          <div className="mt-2 flex">
            <Button onClick={onClick('7')} className="">
              7
            </Button>
            <Button onClick={onClick('8')} className="">
              8
            </Button>
            <Button onClick={onClick('9')} className="">
              9
            </Button>
            <Button
              onClick={onClick(' * ')}
              className=""
              disabled={isOperationButtonDisabled(value)}
            >
              *
            </Button>
          </div>
          <div className="mt-2 flex">
            <Button onClick={onClick('4')} className="">
              4
            </Button>
            <Button onClick={onClick('5')} className="">
              5
            </Button>
            <Button onClick={onClick('6')} className="">
              6
            </Button>
            <Button
              onClick={onClick(' - ')}
              className=""
              disabled={isOperationButtonDisabled(value)}
            >
              -
            </Button>
          </div>
          <div className="mt-2 flex">
            <Button onClick={onClick('1')} className="">
              1
            </Button>
            <Button onClick={onClick('2')} className="">
              2
            </Button>
            <Button onClick={onClick('3')} className="">
              3
            </Button>
            <Button
              onClick={onClick(' + ')}
              className=""
              disabled={isOperationButtonDisabled(value)}
            >
              +
            </Button>
          </div>
          <div className="mt-2 flex">
            <Button onClick={onClick('.')} className="w-1/4 flex-auto ">
              .
            </Button>
            <Button onClick={onClick('0')} className="w-1/4 flex-auto">
              0
            </Button>
            {/* <Button onClick={() => {}} className="">
              {"< x"}
            </Button> */}
            <Button onClick={onClickEqual} className="w-1/2 flex-auto">
              =
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
