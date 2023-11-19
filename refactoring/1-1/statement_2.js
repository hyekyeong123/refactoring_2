// https://github.com/365kim/refactoring-2nd-edition/blob/main/chapter01/01-1/statement.js

const invoice = {
  customer: "BigCo",
  performances: [
    { "playID": "hamlet", "audience": 55 },
    { "playID": "as-like", "audience": 35 },
    { "playID": "othello", "audience": 40 }
  ]
}


const plays={
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "othello": {"name": "Othello", "type": "tragedy"}
}


// 다양한 연극을 외주로 받아서 공연하는 극단
// 공연 요청이 들어오면 연극의 장르와 관객 규모를 기초로 비용을 책정
// 공연료와 별개로 포인트를 지급해서 다음번 의뢰시 공연료를 할인
// 공연료 청구서를 출력하는 코드
function statement_1(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
    .format;


  // 중첩 함수
  function amountFor(perf, play){
    let thisAmount = 0;
    switch (play.type) {
      case 'tragedy':
        thisAmount = 40000;

        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;

      case 'comedy':
        thisAmount = 30000;

        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return thisAmount;
  }


  for (let perf of invoice.performances) {
    const play = plays[perf.playID];

    // 함수 분리
    let thisAmount = amountFor(perf, play)

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === play.type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    // 청구 내역을 출력한다.
    result += `${play.name}: ${format(thisAmount / 100)} ${perf.audience}석\n`;
    totalAmount += thisAmount;
  }
  result += `총액 ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 ${volumeCredits}점\n`;

  return result;
}

// play : {"name": "Hamlet", "type": "tragedy"}


console.log(statement_1(invoice, plays));
/*청구내역 (고객명: BigCo)
Hamlet: $650.00 55석
As You Like It: $580.00 35석
Othello: $500.00 40석
총액 $1,730.00
적립 포인트 47점*/

