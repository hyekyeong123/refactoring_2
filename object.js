
// ****** 0.연관된 변수와 함수의 그룹
let MyMath = {
  PI:Math.PI,

   // 객체에 함수 대입
   random:function(){
    return Math.random();
   },

  floor:function (Integer){
    return Math.floor(Integer);
  }
}

console.log("0_MyMath.random()",MyMath.random());

// ****** 5. this : 본인이 속해 있는 객체를 가리킴
let kim={
  name:"kim",
  first:10,
  second:20,
  sum:function(){
    return this.first+this.second;
  }
}
console.log("5_",kim.sum());

// ****** 6 constructor function 의 필요성(객체 양산)
// constructor function이란,  객체를 찍어내는  함수
function person(name, first, second){
  this.name = name;
  this.first = first;
  this.second = second;
  this.sum = function(){
    return this.first+this.second;
  }
}
let lee = new person();
console.log("6_",person());
console.log("6_",new person()); // 객체를 생성하는 생성자
console.log("6_lee",new person("aaa",1,2)); // 객체를 생성하는 생성자

// ****** 7. prototype
// 객체들이 공통으로 사용하는 속성값
// 객체들이 공통으로 사용하는 속성값을 정의해서 객체가 생성할때 마다 같은 속성 값을 만드는 과정을 생략해, 성능 향상과 메모리를 효율적으로 이용할 수 있게 해준다.
// 개인적으로 속성 정의 도 가능
function personTwo(name, first, second){
  this.name = name;
  this.first = first;
  this.second = second;
}

let jeong = new personTwo("jeong",10,10);
jeong.sum = function(){
  return "각자 정의 가능함(우선)"+this.first+this.second;

}
personTwo.prototype.sum =function (){
  return this.first+this.second;
}

