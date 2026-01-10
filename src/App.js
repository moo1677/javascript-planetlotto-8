import LottoController from './controller/LottoController.js';


class App {
  async run() {
    const manager = new LottoController();
    manager.runLottoMachine();
  }
}
export default App;
