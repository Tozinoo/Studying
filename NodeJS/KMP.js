/*
트라이 : 다중검색, 접두사 패턴일치 확인에 뛰어나다.

보이어 무어 : 끝부분이 일치하지 않으면 처음 부분을 비교해보지 않는다는 가정아래
패턴의 처음이 아닌 마지막 문자를 비교한다.
인덱스를 뛰어 넘을 수 있기 때문에 텍스트 양이 많은 경우 효율적이다.

KMP : 문자열 내에 패턴의 등장 횟수를 검색한다. 텍스트 양이 적을 경우 효율적이다.
텍스트 편집기 어플리케이션과 웹 브라우저 찾기 기능에 사용된다.
KMP는 텍스트 T에서 단어 W의 출현 횟수를 검색. 이때 잘못된 일치가 발생이 되면
다음 일치가 어디에서 시작 될 수 있는지에 대한 충분한 정보를 얻을 수 있다라는 점을 활용.
이것은 이미 일치한 문자들을 다시 검사하는 것을 막아준다.
접두사 배열을 만들 때 접두사 배열이 동일한 접두사를 얻기 위해 인덱스를 얼마나
되돌려야 할 지 나타낼 수 있도록 해야한다.

ex) ababaca의 접두사 만들기

1. 인덱스 0 : 비교할 문자열이 없다. 접두사 배열 값은 0으로 표현
배열 인덱스      0   1   2   3   4   5   6
문자열          a   b   a   b   a   c   a
접두사 배열      0

2. 인덱스 1 : 문자가 b이고 이전 접두사 배열 값이 0이므로 a와 b를 비교. 일치하지 않음으로 0
배열 인덱스      0   1   2   3   4   5   6
문자열          a   b   a   b   a   c   a
접두사 배열     0   0        

3. 인덱스 2 : 문자가 a이고 이전 접두사 배열 값이 0이므로 a와 a를 비교, 일치함으로 이전  접두사 배열 값에 +1
배열 인덱스      0   1   2   3   4   5   6
문자열          a   b   a   b   a   c   a
접두사 배열     0   0   1   

4. 인덱스 3 : 문자가 b이고 이전 접두사 배열 값이 1이므로 b와 b를 비교, 일치함으로 이전  접두사 배열 값에 +1
배열 인덱스      0   1   2   3   4   5   6
문자열          a   b   a   b   a   c   a
접두사 배열     0   0   1   2   

5. 인덱스 4 : 문자가 a이고 이전 접두사 배열 값이 2이므로 a와 a를 비교, 일치함으로 이전  접두사 배열 값에 +1
배열 인덱스      0   1   2   3   4   5   6
문자열          a   b   a   b   a   c   a
접두사 배열     0   0   1   2   3   

6. 인덱스 5 : 문자가 c이고 이전 접두사 배열 값이 3이므로 c와 b를 비교, 일치하지 않음으로 0
배열 인덱스      0   1   2   3   4   5   6
문자열          a   b   a   b   a   c   a
접두사 배열     0   0   1   2   3   0   

7. 인덱스 6 : 문자가 a이고 이전 접두사 배열 값이 0이므로 a와 a를 비교, 일치함으로 이전  접두사 배열 값에 +1
배열 인덱스      0   1   2   3   4   5   6
문자열          a   b   a   b   a   c   a
접두사 배열     0   0   1   2   3   0   1
*/

function prefix(str) {
    // 접두사 배열 생성
    const prefix = new Array(str.length);
    let maxPrefix = 0;
    // 인덱스 0에서 접두사 시작
    prefix[0] = 0;

    for (let i = 1; i < str.length; i++) {
        // 불일치 되는 동안 접두사 값을 감소 시킨다.
        while (str.charAt(i) !== str.charAt(maxPrefix) && maxPrefix > 0) {
            maxPrefix = prefix[maxPrefix - 1];
        }
        // 문자열이 일치하면 접두사 값 갱신
        if (str.charAt(maxPrefix) == str.charAt(i)) {
            maxPrefix++;
        }
        prefix[i] = maxPrefix;
    }
    return prefix;
}
console.log(prefix("zxczxqzx"));

function KMP(str, pattern) {
    const prefixTable = prefix(pattern);
    let patternIndex = 0;
    let strIndex = 0;
    while (strIndex < str.length) {
        // 두 문자가 다르다면
        if (str.charAt(strIndex) != pattern.charAt(patternIndex)) {
            if (patternIndex != 0) {
                patternIndex = prefixTable[patternIndex - 1];
            } else {
                strIndex++; // 문자열 인덱스를 다음 인덱스로 이동
            }
        }
        // 동일 하다면
        else if (str.charAt(strIndex) == pattern.charAt(patternIndex)) {
            strIndex++;
            patternIndex++;
        }
        if (patternIndex == pattern.length) {
            return true;
        }
    }
    return false;
}

console.log(KMP("ababacaababacaababaca", "ababaca"));
console.log(KMP("가나다라마바사", "다라마"));
