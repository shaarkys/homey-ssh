import {
    AuthenticationType,
    CipherAlgorithmType, CompressionAlgorithmType, HMacAlgorithmType,
    KexAlgorithmType,
    ServerHostKeyAlgorithmType,
    SSHServerConfig
} from '../model/ServerConfig';
import {Config, NodeSSH} from 'node-ssh';
import {AlgorithmList, Algorithms, KexAlgorithm} from 'ssh2';

export interface CommandResult {
    stdout: string;
    stderr: string;
    code: number | null;
    signal: string | null;
}

export class SSHApi {
    private readonly sshConfig: Config;

    constructor(
        config: SSHServerConfig,
        private log: (...args: any[]) => void,
        private t: (key: string | Object, tags?: Object | undefined) => string) {

        let algorithms: Algorithms = {}

        if (config.kexAlgorithm && config.kexAlgorithm != KexAlgorithmType.DEFAULT) {
            algorithms.kex = [config.kexAlgorithm]
        }
        if (config.cipherAlgorithm && config.cipherAlgorithm != CipherAlgorithmType.DEFAULT) {
            algorithms.cipher = [config.cipherAlgorithm]

        }
        if (config.hostKeyAlgorithm && config.hostKeyAlgorithm != ServerHostKeyAlgorithmType.DEFAULT) {
            algorithms.serverHostKey = [config.hostKeyAlgorithm]
        }
        if (config.hmac && config.hmac != HMacAlgorithmType.DEFAULT) {
            algorithms.hmac = [config.hmac]
        }
        if (config.compression && config.compression != CompressionAlgorithmType.DEFAULT) {
            algorithms.compress = [config.compression]
        }

        this.sshConfig = {
            host: config.host,
            port: config.port,
            username: config.credentials.username,
            readyTimeout: 5000,
            timeout: 5000,
            algorithms: algorithms
        }
        if (config.authType === AuthenticationType.PRIVATE_KEY) {
            this.sshConfig.privateKey = config.credentials.privateKey;
            if (config.credentials.passphrase) {
                this.sshConfig.passphrase = config.credentials.passphrase;
            }
        } else {
            this.sshConfig.password = config.credentials.password;
        }
    }

    /**
     * Does a connection test.
     */
    async connectionTest(): Promise<boolean> {
        const ssh = new NodeSSH()
        try {
            const client = await ssh.connect(this.sshConfig)
            if (!client.isConnected()) {
                throw new Error(this.t('setup.connection-test.failed'))
            }
            await client.execCommand("whoami")
            return true
        } catch (e) {
            this.log('error connecting to ' + this.sshConfig.host, e);
            throw this.translateNodeSSHError(e)
        } finally {
            ssh.dispose()
        }
    }

    async executeCommand(command: string): Promise<CommandResult> {
        const ssh = new NodeSSH()
        try {
            this.log('connecting ...')
            const client = await ssh.connect(this.sshConfig)
            if (!client.isConnected()) {
                throw new Error(this.t('setup.connection-test.failed'))
            }
            this.log('executing ...')
            const commandResult = await client.execCommand(command)
            this.log('result ...', {
                stdout: commandResult.stdout,
                stderr: commandResult.stderr,
                code: commandResult.code,
                signal: commandResult.signal
            })
            return commandResult
        } catch (e) {
            this.log('error executing command on ' + this.sshConfig.host, e);
            throw this.translateNodeSSHError(e)
        } finally {
            ssh.dispose()
        }
    }

    private translateNodeSSHError(e: any): Error {
        if (e instanceof Error) {
            const failedMessage = this.t('setup.connection-test.failed')
            if (e.message === failedMessage) {
                return e
            }
        }
        if (e.level) {
            if ('client-authentication' === e.level) {
                return new Error(this.t('setup.connection-test.failed-authentication'))
            }
            else if ('client-timeout' === e.level) {
                return new Error(this.t('setup.connection-test.failed-unreachable-host'))
            }
            else if ('client-socket' === e.level) {
                if (e.code && 'EHOSTUNREACH' === e.code) {
                    return new Error(this.t('setup.connection-test.failed-unreachable-host'))
                }
            }
        }
        if (e.message) {
            return new Error(this.t('setup.connection-test.failed-detail', {detail: e.message}))
        }
        return new Error(this.t('setup.connection-test.failed-detail', {detail: e}))
    }

}
