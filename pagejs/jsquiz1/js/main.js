'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: 'タケシの手持ちポケモン、１匹目はイシツブテ、では2匹目は？', c: ['イワーク', 'ゴローン', 'サンドパン', 'サイホーン']},
    {q: 'フシギバナ・リザードン・カメックス、進化レベルが1匹だけ違うポケモンは？', c: ['フシギダネ', 'ヒトカゲ', 'ゼニガメ']},
    {q: 'サファリゾーンで歩ける歩数は何歩に設定されている？', c: ['500歩', '300歩', '400歩', '200歩']},
    {q: 'タマムシデパートは全部で何階建て？', c: ['６階', '４階', '８階']},
    {q: 'ミュウからミュウツーを作り出したとされている人物の名前は？', c: ['フジ老人', 'キクコ', 'カツラ']},
    {q: '次のうちで一番全長が大きいのは？', c: ['カビゴン', 'リザードン', 'カメックス']},
    {q: '「フリーザー」がゲットできる場所は？', c: ['ふたごじま', 'むじんはつでんしょ', 'チャンピオンロード']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}