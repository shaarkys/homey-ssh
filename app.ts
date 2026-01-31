import Homey from 'homey';

class HomeySSHApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('Homey-SSH has been initialized');
  }

}

module.exports = HomeySSHApp;
