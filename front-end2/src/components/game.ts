import type { Component } from "../utils/types"
import { getWord, createSession} from "../utils/game.js"

export class GameComponent implements Component {
  private score = 0;
  private questionCount = 1;
  private startTime = Date.now();
  
  async render(container: HTMLElement): Promise<void> {
    container.replaceChildren();

    const questionNumber = document.createElement('p');
    questionNumber.id = 'question-number';
    questionNumber.textContent = `Question: ${this.questionCount}/10`;
    container.appendChild(questionNumber);

    const title = document.createElement('h1');
    title.textContent = 'Complete The Word';
    container.appendChild(title);

    const scoreBar = document.createElement('p');
    scoreBar.id = 'score-bar';
    scoreBar.textContent = `Score: ${this.score}`;
    container.appendChild(scoreBar);

    const wordElements = await generateWordElements(Number(sessionStorage.getItem('category')));
    container.appendChild(wordElements.answerLetters);
    container.appendChild(wordElements.inputLetters);

    const checkButton = document.createElement('button');
    checkButton.id = 'check';
    checkButton.textContent = 'Check Answer';
    container.appendChild(checkButton);

    const inputParent = document.getElementById('input-letters') as HTMLElement;
    const answerParent = document.getElementById('answer-letters') as HTMLElement;
    const letters = document.querySelectorAll('.moveable');

    letters.forEach((letter) => {
      letter.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.parentElement === answerParent) {
          const blankSpace = inputParent.getElementsByClassName('letter space')[0] as HTMLElement;
          swapElements(target, blankSpace);
        } else {
          const blankSpace = answerParent.getElementsByClassName('letter space')[0] as HTMLElement;
          if (blankSpace === undefined) return;
          swapElements(target, blankSpace);
        }
      });
    });

    checkButton.addEventListener('click', async () => {
      const letters = answerParent.querySelectorAll('.letter');
      const answer = Array.from(letters).map((letter) => {
        return letter.textContent || '';
      }).join('');

      if (answer === sessionStorage.getItem('word')) {
        this.score += 5;
        this.questionCount++;

        if (this.questionCount > 10) {
          await createSession(Date.now(), this.score);
          return;
        }
        this.render(container);
      } else {
        this.score -= 1;
        scoreBar.textContent = `Score: ${this.score}`;
        questionNumber.textContent = `Question: ${this.questionCount}`;
      }
    });
  }
}

function swapElements(el1: HTMLElement, el2: HTMLElement) {
  const parent1 = el1.parentNode;
  const sibling1 = el1.nextSibling === el2 ? el1 : el1.nextSibling;

  el2.parentNode?.insertBefore(el1, el2);
  parent1?.insertBefore(el2, sibling1);
}

async function generateWordElements(category: Number) {
  const word = await getWord(category);
  sessionStorage.setItem('word', word);
  
  const answerLetters = document.createElement('ol');
  answerLetters.id = 'answer-letters';
  answerLetters.className = 'letter-container';

  const inputLetters = document.createElement('ol');
  inputLetters.id = 'input-letters';
  inputLetters.className = 'letter-container';

  let wordArray = word.split('');
  const blankSpaces = Math.floor(Math.random() * wordArray.length/2) + 1;
  let blankLetters = ['A','I','E','O','U'];

  for (let i = 0; i < blankSpaces; i++) {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    blankLetters.push(wordArray[randomIndex]);
    wordArray[randomIndex] = ' ';
  }

  wordArray.forEach((letter) => {
    const li = document.createElement('li');
    li.className = letter === ' ' ? 'letter space' : 'letter';
    if (letter !== ' ') {
      li.textContent = letter;
    }
    answerLetters.appendChild(li);
  });

  blankLetters = shuffleArray(blankLetters);
  blankLetters.forEach((letter) => {
    const li = document.createElement('li');
    li.className = 'letter moveable';
    li.textContent = letter;
    inputLetters.appendChild(li);
  });

  return { answerLetters, inputLetters };
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
