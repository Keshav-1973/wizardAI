import { Config } from "react-native-config";

export const EnvVars = {
    OAuth: {
        google: {
            webClientId: Config.GOOGLE_OAUTH_WEB_CLIENT_ID
        }
    },
    EXTERNAL_WEBSITES: {
        WIZARDAI_PLAYSTORE: Config.WIZARDAI_PLAYSTORE
    }
};
