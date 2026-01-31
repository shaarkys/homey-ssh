import Homey from 'homey';
import {AuthenticationType, SSHServerConfig} from '../../src/model/ServerConfig';
import PairSession from 'homey/lib/PairSession';
import {SSHApi} from '../../src/api/api';

class SSHServerDriver extends Homey.Driver {

  private settings: SSHServerConfig = {
    name: '',
    host: '',
    port: 22,
    authType: AuthenticationType.USERNAME_PASSWORD,
    credentials : {
      username: '',
      password: ''
    }
  }

  async onPair(session: PairSession): Promise<void> {
    session.setHandler('settingsChanged', async (data: SSHServerConfig) => {
      return await this.onSettingsChanged(data);
    })

    session.setHandler('checkConnection', async (data: SSHServerConfig) => {
      return await this.onCheckConnection(data);
    })

    session.setHandler("list_devices", async () => {
      return await this.onPairListDevices();
    });

    session.setHandler("getSettings", async () => {
      return this.settings;
    });

  }

  async onSettingsChanged(data: SSHServerConfig) {
    this.settings = data;
    return true;
  }

  private validateSettings(): string | undefined {
    if (this.settings.name === null || this.settings.name.trim() === '') {
      return this.homey.__('setup.validation.required', {input: this.homey.__('setup.name')});
    }
    if (this.settings.host === null || this.settings.host.trim() === '') {
      return this.homey.__('setup.validation.required', {input: this.homey.__('setup.address')});
    }
    if (this.settings.port === null || isNaN(this.settings.port) || this.settings.port < 1 || this.settings.port > 65535) {
      return this.homey.__('setup.validation.port', {input: this.homey.__('setup.port')});
    }
    if (this.settings.credentials.username === null || this.settings.credentials.username == '') {
      return this.homey.__('setup.validation.required', {input: this.homey.__('setup.username')});
    }
    if (this.settings.authType === AuthenticationType.USERNAME_PASSWORD ) {
      // @ts-ignore
      if (this.settings.credentials.password === undefined || this.settings.credentials.password === null || this.settings.credentials.password == '') {
        return this.homey.__('setup.validation.required', {input: this.homey.__('setup.password')});
      }
    }
    if (this.settings.authType === AuthenticationType.PRIVATE_KEY ) {
      // @ts-ignore
      if (this.settings.credentials.privateKey === undefined || this.settings.credentials.privateKey === null || this.settings.credentials.privateKey == '') {
        return this.homey.__('setup.validation.required', {input: this.homey.__('setup.key')});
      }
    }
    return undefined;
  }

  async onCheckConnection(data: SSHServerConfig) {
    this.settings = data;
    const validationError = this.validateSettings();
    if (validationError) {
      return validationError;
    }
    const api = new SSHApi(this.settings, this.log, this.homey.__)
    try {
      await api.connectionTest();
      return this.homey.__('setup.connection-test.success');
    } catch (e) {
      // @ts-ignore
      if (e.message) {
        // @ts-ignore
        return e.message;
      }
      return this.homey.__('setup.connection-test.failed-detail', {detail: e});
    }

  }

  async onInit() {
    this.log('SSHServerDriver has been initialized');
  }

  async onPairListDevices() {
    return [
      {
        name: this.settings.name,
        data: {
          id: 'ssh-server-' + this.settings.host + '-' + Date.now(),
        },
        store: {
          settings: this.settings
        },
      },
    ];
  }

}

module.exports = SSHServerDriver;
