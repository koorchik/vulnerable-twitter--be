/* istanbul ignore next */

import LIVR         from 'livr';
import uuidValidate from 'uuid-validate';

const defaultRules = {
    'object_id'() {
        return value => {
            if (uuidValidate(value, 4)) return;

            if (value === undefined || value === null || value === '') return;
            if (typeof value !== 'string') return 'FORMAT_ERROR';
            if (value.length < 24) return 'WRONG_ID';
            if (value.length > 24) return 'WRONG_ID';
            if (value.match(/[^a-f0-9]/)) return 'WRONG_ID';
        };
    },

    'future_date'() {
        return value => {
            if (value === undefined || value === null || value === '') return;
            const valueDate = new Date(value);

            valueDate.setTime(valueDate.getTime() + valueDate.getTimezoneOffset() * 60 * 1000);
            if (valueDate - new Date() < 0) return 'WRONG_DATE';

            return;
        };
    }
};

LIVR.Validator.registerDefaultRules(defaultRules);
