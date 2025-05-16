import type { Component } from "../utils/types"
import { getWord, createSession} from "../utils/game.js"

export class GameComponent implements Component {
  private score = 0;
  private questionCount = 1;
  private startTime = Date.now();
  async render(container: HTMLElement): Promise<void> {
    container.innerHTML = `
    <p id="question-number">Question: ${this.questionCount}/10</p>
    <h1>Complete The Word</h1>
    <p id="score-bar">Score: ${this.score}</p>
    ${await generateWordQuestion(Number(sessionStorage.getItem('category')))}
    <button id="check">Check Answer</button>
    `
    const inputParent = document.getElementById('input-letters') as HTMLElement
    const answerParent = document.getElementById('answer-letters') as HTMLElement
    const letters = document.querySelectorAll('.moveable')

    letters.forEach((letter) => {
      letter.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        if (target.parentElement === answerParent) {
          const blankSpace = inputParent.getElementsByClassName('letter space')[0] as HTMLElement
          swapElements(target, blankSpace)
        } else {
          const blankSpace = answerParent.getElementsByClassName('letter space')[0] as HTMLElement
          if (blankSpace === undefined) return
          swapElements(target, blankSpace)
        }
        // inputParent.replaceChild(blankSpace, target)
      })
    })
    document.getElementById('check').addEventListener('click', async () => {

      const letters = answerParent.querySelectorAll('.letter')
      const answer = Array.from(letters).map((letter) => {
        return letter.innerHTML;
      }).join('')
      if (answer === sessionStorage.getItem('word')) {
        this.score += 5;
        this.questionCount++;

        if (this.questionCount > 10) {
          await createSession(Date.now(), this.score)
          return;
        }
        this.render(container);
      } else {
        this.score -= 1;
        document.getElementById('score-bar').innerHTML = `Score: ${this.score}`
        document.getElementById('question-number').innerHTML = `Question: ${this.questionCount}`
      }
    })
  }
}

function swapElements(el1: HTMLElement, el2: HTMLElement) {
  const parent1 = el1.parentNode;
  const sibling1 = el1.nextSibling === el2 ? el1 : el1.nextSibling;

  el2.parentNode?.insertBefore(el1, el2);
  parent1?.insertBefore(el2, sibling1);
}

function generateWordQuestion(category: Number): Promise<string> {
  return getWord(category).then((word) => {
    let generatedResult = `<ol id="answer-letters" class = "letter-container">`
    let wordArray = word.split('')
    const blankSpaces = Math.floor(Math.random() * wordArray.length/2) +1
    console.log(blankSpaces)
    let blankLetters = ['A','I','E','O','U']

    for (let i = 0; i < blankSpaces; i++) {
      const randomIndex = Math.floor(Math.random() * wordArray.length)
      blankLetters.push(wordArray[randomIndex])
      wordArray[randomIndex] = ' '
    }
    wordArray.forEach((letter) => {
      if (letter === ' ') {
        generatedResult += `<li class = "letter space"></li>`
      } else {
        generatedResult += `<li class = "letter">${letter}</li>`
      }
    })
    generatedResult += `</ol><ol id="input-letters" class = "letter-container">`
    blankLetters = shuffleArray(blankLetters)
    blankLetters.forEach((letter) => {
      generatedResult += `<li class = "letter moveable">${letter}</li>`
    })
    generatedResult += `</ol>`
    return generatedResult;
  });
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]; // copy to avoid mutating original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}
