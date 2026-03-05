import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Attachment = sequelize.define('Attachment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fileName: { type: DataTypes.STRING, allowNull: false, field: 'file_name' },
    filePath: { type: DataTypes.STRING, allowNull: false, field: 'file_path' },
    fileType: { type: DataTypes.STRING, field: 'file_type' },
    fileSize: { type: DataTypes.INTEGER, field: 'file_size' },
}, {
    tableName: 'attachments',
    timestamps: true,
    underscored: true,
});

export default Attachment;
