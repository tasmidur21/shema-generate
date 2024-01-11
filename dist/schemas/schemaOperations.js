"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaOperations = void 0;
class SchemaOperations {
    static getTableSchema(database) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database.query(`
        SELECT table_name,column_name, data_type, character_maximum_length, is_nullable, column_default
        FROM 
           information_schema.columns
        WHERE 
           table_name = 'menus';
        `);
                return result.rows;
            }
            catch (error) {
                console.error('Error retrieving table schema:', error);
                return [];
            }
        });
    }
    static generateValidationRules(tableSchema) {
        const validationRules = {};
        tableSchema.forEach(({ table_name, column_name, data_type, character_maximum_length, is_nullable, column_default }) => {
            // Add logic here to define rules based on data_type
            // Example: For string types, check for length constraints
            //validationRules[column_name]['required'] = true;
            switch (true) {
                case data_type.includes('character') || data_type === 'text': {
                    validationRules[column_name] = {
                        type: 'string',
                        maxLength: character_maximum_length !== null && character_maximum_length !== void 0 ? character_maximum_length : 255, // Adjust as needed
                    };
                    break;
                }
                default: {
                    break;
                }
            }
        });
        return validationRules;
    }
}
exports.SchemaOperations = SchemaOperations;
SchemaOperations.integerTypes = {
    smallint: { min: '-32768', max: '32767' },
    integer: { min: '-2147483648', max: '2147483647' },
    bigint: { min: '-9223372036854775808', max: '9223372036854775807' },
};
