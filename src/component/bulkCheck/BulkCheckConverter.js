import * as Excel from 'exceljs';
import moment from 'moment';
import { exportWorkBook } from '../../Services/FileService';
import { labelConstant } from './BulkCheckContants';

export const exportReport = async (reportData) => {
  const workbookExcel = new Excel.Workbook();
  const worksheet = workbookExcel.addWorksheet('Flight_Schedule');
  const columnsStyle = { alignment: { wrapText: true } };
  let filename = `Schedule_Bulk_Check${moment(new Date()).format('DDMMYYhhmmss')}_Response`;
  if (reportData === 'Temp') {
    worksheet.columns = [
      { header: labelConstant.origin, key: 'origin', width: 17.5, locked: true },
      { header: labelConstant.nextDestination, key: 'nextDes', width: 26.5 },
      { header: labelConstant.finalDestination, key: 'finalDes', width: 27.5 },
      { header: labelConstant.aircraftRegisterNumber, key: 'aircraftReg', width: 26 },
      { header: labelConstant.aircraftTypeId, key: 'aircraftId', width: 15 },
    ];
    filename = `Schedule_Bulk_Check${moment(new Date()).format('DDMMYYhhmmss')}`;
  } else {
    worksheet.columns = [
      { header: labelConstant.origin, key: 'origin', width: 17.5, locked: true },
      { header: labelConstant.nextDestination, key: 'nextDes', width: 26.5 },
      { header: labelConstant.finalDestination, key: 'finalDes', width: 27.5 },
      { header: labelConstant.aircraftRegisterNumber, key: 'aircraftReg', width: 26 },
      { header: labelConstant.aircraftTypeId, key: 'aircraftId', width: 15 },
      { header: 'Action', key: 'action', width: 18 },
      { header: 'Message', key: 'status', width: 50, style: columnsStyle },
    ];
    if (reportData && reportData.length && reportData.length > 0) {
      reportData.map((item) =>
        worksheet.addRow({
          origin: item.originIATA === 'N/A' ? '' : item.originIATA,
          nextDes: item.interimDestinationIATA === 'N/A' ? '' : item.interimDestinationIATA,
          finalDes: item.destinationIATA === 'N/A' ? '' : item.destinationIATA,
          aircraftReg: item.aircraftRegNumber,
          aircraftId: item.aircraftTypeId,
          action: item.action,
          status: item.response === 'N/A' ? '' : item.response,
        })
      );
    }
  }

  worksheet.getRow(1).font = { size: 11, bold: true };
  const buffer = await workbookExcel.xlsx.writeBuffer();
  exportWorkBook(filename, buffer);
};

export const exportAircraft = async (aircraftData) => {
  const workbookExcel = new Excel.Workbook();
  const worksheet = workbookExcel.addWorksheet('Aircraft List');
  const filename = `Aircraft List`;
  worksheet.columns = [
    { header: 'Aircraft Type Id', key: 'aircraftId', width: 15 },
    { header: 'Aircraft Type Name', key: 'aircraftName', width: 40 },
  ];
  if (aircraftData && aircraftData.length && aircraftData.length > 0) {
    aircraftData.map((item) => {
      if (item.active === true) {
        worksheet.addRow({
          aircraftName: item.aircraftTypeName,
          aircraftId: item.aircraftTypeId,
        });
        return true;
      }
      return false;
    });
  }

  worksheet.getRow(1).font = { size: 11, bold: true };
  const buffer = await workbookExcel.xlsx.writeBuffer();
  exportWorkBook(filename, buffer);
};
export const handleSubmit = (optJsonData) => {
  const invalidData = [];
  const validData = [];
  let checkValue = true;
  optJsonData.map((item1) => {
    if (
      (item1.orgAirport !== '' && (item1.orgAirport.length < 3 || item1.orgAirport.length > 4)) ||
      (item1.interimDestAirport !== '' &&
        (item1.interimDestAirport.length < 3 || item1.interimDestAirport.length > 4)) ||
      item1.destAirport === '' ||
      item1.destAirport.length < 3 ||
      item1.destAirport.length > 4 ||
      item1.aircraftRegNumber === '' ||
      item1.aircraftRegNumber.length > 30 ||
      item1.aircraftTypeId === '' ||
      item1.aircraftTypeId.length > 30
    ) {
      invalidData.push(item1);
      checkValue = false;
    } else {
      validData.push(item1);
    }
    return true;
  });
  const optdata = invalidData.concat(validData);
  return { optdata, checkValue };
};

export const headerArray = [
  labelConstant.origin,
  labelConstant.finalDestination,
  labelConstant.nextDestination,
  labelConstant.aircraftRegisterNumber,
  labelConstant.aircraftTypeId,
];
