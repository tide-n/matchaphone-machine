// 自部署绕过激活，保留所有导出防止编译报错
export const ACTIVATION_ENVIRONMENT_ID = "self-hosted-bypass";
export const ACTIVATION_REGION = "local";

export type ActivationDeviceMethod = "p256" | "installation-secret";

export interface ActivationLicensePayload {
  version: 1;
  environmentId: string;
  activationId: string;
  cloudbaseUid: string;
  deviceKeyHash: string;
  issuedAt: number;
  permanent: true;
}

export interface StoredActivationLicense {
  payload: ActivationLicensePayload;
  signature: string;
  publicKeyId: string;
}

export interface ActivationDeviceRecord {
  method: ActivationDeviceMethod;
  keyHash: string;
  publicKeyJwk?: JsonWebKey;
  privateKey?: CryptoKey;
  installationSecret?: string;
  createdAt: number;
}

export type ActivationFailureReason =
  | "invalid-code"
  | "already-used"
  | "rate-limited"
  | "unauthenticated"
  | "invalid-device"
  | "network"
  | "configuration"
  | "incompatible";

export type ActivationResult =
  | { ok: true; license: StoredActivationLicense }
  | { ok: false; reason: ActivationFailureReason };

export function normalizeActivationCode(_value: string) {
  return "";
}

export function formatActivationCode(_value: string) {
  return "";
}

export function canonicalActivationPayload(_payload: ActivationLicensePayload) {
  return JSON.stringify({
    version: 1,
    environmentId: "self-hosted",
    activationId: "bypass",
    cloudbaseUid: "",
    deviceKeyHash: "",
    issuedAt: Date.now(),
    permanent: true
  });
}
