import LottoController from './controller/LottoController.js';

class App {
  async run() {
    const manager = new LottoController();
    await manager.runLottoMachine();
  }
}
export default App;
