import { quitGame } from '../api/quitgame.js'
import { createNewGame } from '../api/newgame.js'
import { joinGame } from '../api/joingame.js'
import { renderGameHome } from './gameHome.js';
import { renderTicTacToeGame } from './tictactoe.js';

// export function showGameHomePage() {
//   document.querySelector('#app').innerHTML = `
//     <div>
//           <button id="startBtn">Start Game</button>
          
      
//           <pre id="log" style="
//             margin-top:20px;
//             border:1px solid #ccc;
//             padding:10px;
//             height:200px;
//             overflow-y:auto;
//             background:#f7f7f7;
//             color: grey;
//             text-align: left;
//           ">
//           </pre>
      
//           <div style="margin-top:20px;">
//             <input id="gameIdInput" placeholder="Enter Game ID" />
//             <button id="joinBtn">JOIN</button>
//           </div>
      
//     </div>
//     `;
//     startNewGame();
// }



export function showGameScreen(gameId, playerId) {
  console.log("inside showGameScreen, ")
  renderTicTacToeGame(document.getElementById('app'), gameId, playerId);
  quitGame(playerId);
}

export function showHomeScreen() {
  renderGameHome(document.getElementById('app'), 'tictactoe');
}

export function updateRoomStatusUI({ playerCount, players }) {
  const statusBox = document.getElementById("roomStatus");

  statusBox.innerHTML = `
        <p><strong>Players in Room:</strong> ${playerCount}</p>
        <ul>${players.map(p => `<li>${p}</li>`).join("")}</ul>
    `;
}



