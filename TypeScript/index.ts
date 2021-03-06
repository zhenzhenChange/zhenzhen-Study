// 基本类型注解
let num: number = 123;
let str: string = 'str';
let bool: boolean = true;

function foo(arg: number): number {
  return arg;
}

const result = foo(num);
console.log(result);

// 数组注解
let bry: object[] = [];
bry.push([]);

// 接口注解
interface User {
  username: string;
  password: string;
}
let user: User;
user = {
  username: 'zhenzhen',
  password: '123456',
};

// 内联类型注解
let My: {
  name: string;
  age: number;
};
My = {
  name: 'zhenzhen',
  age: 22,
};

// 特殊类型 any null undefined void
let any: any;
any = '1';
any = 1;
any = null;
any = undefined;
num = any;
bool = any;

function aaa(num: number): void {
  void num;
}

// 泛型
function reverse<T>(ary: T[]): T[] {
  const result: T[] = [];

  for (let i = ary.length - 1; i >= 0; i--) {
    result.push(ary[i]);
  }

  return result;
}

const ary: number[] = [1, 2, 3];
const strAry: string[] = ['1', '2', '3'];

let results = reverse(ary);
let resultStr = reverse(strAry);

console.log(results);
console.log(resultStr);

results[0] = 1;
resultStr[0] = '1';

// 联合类型注解
function formatString(str: string[] | string): string {
  let s: string = '';

  if (Array.isArray(str)) s = str.join('');
  else s = str.trim();

  return s;
}

const forStr: string = 'aa';
const forStrAry: string[] = ['aaa   ', 'bb', 'cc'];

const forResult = formatString(forStr);
console.log(forResult);

// 交叉类型
function extend<T, U>(param: T, arg: U): T & U {
  const result = <T & U>{};

  for (const key in param) {
    (<T>result)[key] = param[key];
  }

  for (const key in arg) {
    if (!result[key]) {
      (<U>result)[key] = arg[key];
    }
  }

  return result;
}

const resultExtend = extend({ name: 'zhenzhen' }, { name: 'xiaozhenzhen', age: 22 });
console.log(resultExtend);

// 元组
let member: [string, number, object];
member = ['1', 2, {}];

let [memberStr, memberNum, memberObj] = member; // 解构
console.log(memberStr, memberNum, memberObj);

// 类型别名
type StrOrNum = string | number | boolean | { val: number };
type cb = (data: object) => void;

let typeAlias: StrOrNum;
typeAlias = '123';
typeAlias = 123;
typeAlias = true;
typeAlias = { val: 123 };

// 类型断言
let Foo: number = 123;
let Bar: string = '123';
Bar = Foo as any;

function Baz(): any {
  return 123;
}
Bar = Baz() /*  as any */;
/* 
// 类型声明 globals.d.ts
zhenzhenzhen = true;

// 扩充类型声明接口
interface Process {
  with(code?: number): void;
}
process.with = function (code) {
  process.exit(code);
  return '321';
}; */

// 类接口
interface Point {
  x: number;
  y: number;
}

class MyPoint implements Point {
  x!: number;
  y!: number;
}

let foos: Point = new MyPoint();
foos.x;

// 枚举（数字类型）
enum CardSuit {
  Clubs = 1,
  Diamonds,
  Hearts,
  Spades,
}

let Card = CardSuit.Clubs;
Card = 123;

// 编译后
/* 
  var CardSuit;
  (function (CardSuit) {
    CardSuit[(CardSuit['Clubs'] = 0)] = 'Clubs';
    CardSuit[(CardSuit['Diamonds'] = 1)] = 'Diamonds';
    CardSuit[(CardSuit['Hearts'] = 2)] = 'Hearts';
    CardSuit[(CardSuit['Spades'] = 3)] = 'Spades';
  })(CardSuit || (CardSuit = {}));
  var Card = CardSuit.Clubs;
  Card = 123;
  console.log(CardSuit);
*/

// 字符串型
enum TypeEnum {
  Error = 'error',
  Success = 'success',
}

let some: string = 'error';
const value = some as TypeEnum;
console.log(value == TypeEnum.Error);

// 常量枚举（不会生成 Type 的代码，可加上编译标记 tsc index.ts --preserveConstEnums 生成代码）
const enum Type {
  False,
  True,
}
let lie = Type.False;

// 编译后
// var lie = 0 /* False */;

// 含有静态方法的枚举 （和命名空间合并）
enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

namespace Weekday {
  export function isBusinessDay(day: Weekday) {
    switch (day) {
      case Weekday.Saturday:
      case Weekday.Sunday:
        return false;
      default:
        return true;
    }
  }
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;
console.log(Weekday.isBusinessDay(mon));
console.log(Weekday.isBusinessDay(sun));

// 开放式枚举（跨文件定义、扩展枚举 (Weekday || (Weekday = {})) ） 合并
enum Color {
  Red,
  Blue,
}

enum Color {
  DarkRed = 3, // 需要指定初始枚举类型值
  DarkBlue,
}

// 断言
let a: number[];
let b!: number[];

init();
// a.push(5);
b.push(5);

function init() {
  a = [1, 2, 3, 4];
  b = [1, 2, 3, 4];
}

const AB = 123;
AB.toString();

// 参数注解
let variable: { bar: number };
function h(variable: { bar: number }) {}

// 返回类型 注解
interface FF {
  foo: string;
}

function FL(sample: FF): FF {
  // return { foo: '123' };
  return sample;
}

// 可选参数
function FA(bar: number, bas?: string): void {}

FA(123);
FA(123, '33');

// 默认参数
function BA(bar: number, bas: string = 'Hello') {}
BA(123);
BA(22, '1');

// 重载
function padding(all: number): any;
function padding(tb: number, lr: number): any;
function padding(t: number, r: number, b: number, l: number): any;

function padding(a: number, b?: number, c?: number, d?: any): any {
  if (b === undefined && c === undefined && d === undefined) b = c = d = a;
  else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }

  return {
    top: a,
    right: b,
    bottom: c,
    left: d,
  };
}

// 声明函数
type LongHand = {
  // 可以用于函数重载
  (a: number): number;
};

type ShortHand = (a: number) => number;

type allHand = {
  (a: number): number;
  (a: string): string;
};

// 可调用
interface ReturnString {
  (): string;
}

declare const of: ReturnString;
const bar = of();

// rest 参数
interface Complex {
  (foo: string, bar?: number, ...arg: boolean[]): number;
}

// 重载调用注解
interface Over {
  (foo: string): string;
  (foo: number): number;
}

function sn(foo: number): number;
function sn(foo: string): string;
function sn(foo: any): any {
  return typeof foo == 'number' ? foo ** 2 : `Hello ${foo}`;
}

const load: Over = sn;

const st = load('zhenzhen');
const nu = load(10);

// 内联接口调用
const loads: { (foo: string): string; (foo: number): number } = (foo: any) => foo;

// 箭头函数（不能重载）
const simple: (foo: string) => string = (foo) => foo.toString();

// 可实例化
interface CallNew {
  new (): string;
}

declare const FP: CallNew;
const fp = new FP();
