export interface SSHCredentials {
    username: string,
    password?: string,
    privateKey?: string,
    passphrase?: string
}

export interface SSHServerConfig {
    name: string,
    host: string,
    port: number,
    authType: AuthenticationType,
    credentials: SSHCredentials,
    kexAlgorithm?: KexAlgorithmType,
    cipherAlgorithm?: CipherAlgorithmType,
    hostKeyAlgorithm?: ServerHostKeyAlgorithmType,
    hmac?: HMacAlgorithmType,
    compression?: CompressionAlgorithmType,
}

export enum AuthenticationType {
    USERNAME_PASSWORD = 'USERNAME_PASSWORD',
    PRIVATE_KEY = 'PRIVATE_KEY'
}

export enum KexAlgorithmType {
    DEFAULT = "default",
    CURVE_25519_SHA_256 = "curve25519-sha256",
    CURVE_25519_SHA_256_LIBSSH_ORG = "curve25519-sha256@libssh.org",
    ECDH_SHA_2_NISTP_256 = "ecdh-sha2-nistp256",
    ECDH_SHA_2_NISTP_384 = "ecdh-sha2-nistp384",
    ECDH_SHA_2_NISTP_521 = "ecdh-sha2-nistp521",
    DIFFIE_HELLMAN_GROUP_EXCHANGE_SHA_256 = "diffie-hellman-group-exchange-sha256",
    DIFFIE_HELLMAN_GROUP_14_SHA_256 = "diffie-hellman-group14-sha256",
    DIFFIE_HELLMAN_GROUP_15_SHA_512 = "diffie-hellman-group15-sha512",
    DIFFIE_HELLMAN_GROUP_16_SHA_512 = "diffie-hellman-group16-sha512",
    DIFFIE_HELLMAN_GROUP_17_SHA_512 = "diffie-hellman-group17-sha512",
    DIFFIE_HELLMAN_GROUP_18_SHA_512 = "diffie-hellman-group18-sha512",
    DIFFIE_HELLMAN_GROUP_EXCHANGE_SHA_1 = "diffie-hellman-group-exchange-sha1",
    DIFFIE_HELLMAN_GROUP_14_SHA_1 = "diffie-hellman-group14-sha1",
    DIFFIE_HELLMAN_GROUP_1_SHA_1 = "diffie-hellman-group1-sha1",
}

export enum CipherAlgorithmType {
    DEFAULT = "default",
    CHACHA_20_POLY_1305_OPENSSH_COM = "chacha20-poly1305@openssh.com",
    AES_128_GCM = "aes128-gcm",
    AES_128_GCM_OPENSSH_COM = "aes128-gcm@openssh.com",
    AES_256_GCM = "aes256-gcm",
    AES_256_GCM_OPENSSH_COM = "aes256-gcm@openssh.com",
    AES_128_CTR = "aes128-ctr",
    AES_192_CTR = "aes192-ctr",
    AES_256_CTR = "aes256-ctr",
    AES_256_CBC = "aes256-cbc",
    AES_192_CBC = "aes192-cbc",
    AES_128_CBC = "aes128-cbc",
    BLOWFISH_CBC = "blowfish-cbc",
    THREE_DES_CBC = "3des-cbc",
    ARCFOUR_256 = "arcfour256",
    ARCFOUR_128 = "arcfour128",
    CAST_128_CBC = "cast128-cbc",
    ARCFOUR = "arcfour",
}

export enum ServerHostKeyAlgorithmType {
    DEFAULT = "default",
    SSH_ED_25519 = "ssh-ed25519",
    ECDSA_SHA_2_NISTP_256 = "ecdsa-sha2-nistp256",
    ECDSA_SHA_2_NISTP_384 = "ecdsa-sha2-nistp384",
    ECDSA_SHA_2_NISTP_521 = "ecdsa-sha2-nistp521",
    RSA_SHA_2_512 = "rsa-sha2-512",
    RSA_SHA_2_256 = "rsa-sha2-256",
    SSH_RSA = "ssh-rsa",
    SSH_DSS = "ssh-dss",
}

export enum HMacAlgorithmType {
    DEFAULT = "default",
    HMAC_SHA_2_256_ETM_OPENSSH_COM = "hmac-sha2-256-etm@openssh.com",
    HMAC_SHA_2_512_ETM_OPENSSH_COM = "hmac-sha2-512-etm@openssh.com",
    HMAC_SHA_1_ETM_OPENSSH_COM = "hmac-sha1-etm@openssh.com",
    HMAC_SHA_2_256 = "hmac-sha2-256",
    HMAC_SHA_2_512 = "hmac-sha2-512",
    HMAC_SHA_1 = "hmac-sha1",
    HMAC_MD_5 = "hmac-md5",
    HMAC_SHA_2_256_96 = "hmac-sha2-256-96",
    HMAC_SHA_2_512_96 = "hmac-sha2-512-96",
    HMAC_RIPEMD_160 = "hmac-ripemd160",
    HMAC_SHA_1_96 = "hmac-sha1-96",
    HMAC_MD_5_96 = "hmac-md5-96",
}

export enum CompressionAlgorithmType {
    DEFAULT = "default",
    NONE = "none",
    ZLIB = "zlib",
    ZLIB_OPENSSH_COM = "zlib@openssh.com"
}

