### How to start the Project 

1. git clone https://github.com/PriyankaTiwary123/Wordle-Game.git
2. cd Wordle-Game
3. npm i
4. npm run dev 
A Vit Project will open on  http://localhost:5173/


##### Features
1. 5*5 Grid to play Wordle.- The Grid is customizable from the values of ROWS and COLUMNS in constant file , we can change the number of rows and columns depending on our requirement (Columns is defaulted to 5 if we are trying to make column length 16 as API is currently restricted to only fetch word of maximum of length 15)
2. Each Row will be validated against a random word getting from API.
3. The row which is validated becomes disable and cannot be edited anymore.
4. If the word matches then all the cell in grid for that particluar row changes to Green.
5. If non of the letter matches then all the cell in grid for that particular changes to Gray.
6. if there is occurence of letter in target word then that particular cell chnages to yellow.
7. If there are multiple occurence of letter only the letter at correct position is marked as green and remain occurence of that letter is marked as gray.

8. The Game is responsive in nature
9.  Added Accessibility to all the required elements

