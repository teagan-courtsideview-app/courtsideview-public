import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { Workbook, SpreadsheetFile, FileBlob } from '@oai/artifact-tool';

const baseDir = path.dirname(fileURLToPath(import.meta.url));
const outDir = process.argv[2] || path.join(os.tmpdir(), 'courtsideview-worksheet-build');
await fs.mkdir(outDir, { recursive: true });

const reviewed = new Date('2026-10-26T12:00:00Z');
const facts = JSON.parse(await fs.readFile(path.join(baseDir, 'matchday-comparison-facts.json'), 'utf8')).facts.map(f => [f.product,f.topic,f.summary,f.limit,f.url]);

const criteria = [
  'Score entry', 'Player statistics', 'Family follow-along', 'Video needs',
  'Device and connectivity fit', 'Full cost of chosen workflow', 'Event and team requirements',
];
const products = ['CourtsideView', 'GameChanger', 'SoloStats', 'VolleyWrite'];
const wb = Workbook.create();
const main = wb.worksheets.add('Your comparison');
const source = wb.worksheets.add('Product facts');
const ink = '#172A30', green = '#114B38', muted = '#52636A', amber = '#FFF2CC';

for (const sh of [main, source]) {
  sh.showGridLines = false;
  sh.getRange(sh === main ? 'A1:G23' : 'A1:G30').format.font = { name: 'Arial', size: 11, color: ink };
  sh.getRange(sh === main ? 'A1:G23' : 'A1:G30').format.verticalAlignment = 'center';
}
main.tabColor = green;
main.getRange('A2').values = [['Volleyball app comparison']];
main.getRange('A2').format.font = { name: 'Arial', size: 16, bold: true, color: green };
main.getRange('A2:G2').format.rowHeight = 30;
main.getRange('A3').values = [['Choose what matters to your family or team. Product order is alphabetical.']];
main.getRange('A3').format.font = { name: 'Arial', size: 11, color: muted };
main.getRange('A4').values = [['Importance: 0 = ignore, 5 = essential.']];
main.getRange('C4').values = [['Your ratings: 0 = does not fit, 5 = fits very well. Amber cells are editable.']];
main.getRange('A6').values = [['Your weighted fit (0–5)']];
main.getRange('A6:F6').format.font = { name: 'Arial', size: 11, bold: true, color: green };
main.getRange('C6:F6').format.fill = '#EAF4EF';
main.getRange('C6:F6').format.numberFormat = '0.00';
main.getRange('A8:G8').values = [['Criterion', 'Importance', ...products, 'Your notes']];
main.getRange('A8:G8').format = {
  fill: green, font: { name: 'Arial', size: 11, bold: true, color: '#FFFFFF' },
  horizontalAlignment: 'center', verticalAlignment: 'center', wrapText: true,
  rowHeight: 36,
  borders: { insideVertical: { style: 'thin', color: '#FFFFFF' } },
};
main.getRange('A9:G15').values = criteria.map(c => [c, null, null, null, null, null, null]);
main.getRange('A9:G15').format.rowHeight = 42;
main.getRange('A9:A15').format.wrapText = true;
main.getRange('G9:G15').format.wrapText = true;
main.getRange('B9:F15').format.fill = amber;
main.getRange('B9:F15').format.horizontalAlignment = 'right';
main.getRange('B9:F15').format.borders = {
  insideHorizontal: { style: 'thin', color: '#E2D5B0' },
  insideVertical: { style: 'thin', color: '#FFFFFF' },
};
main.getRange('B9:F15').setNumberFormat('0.0');
main.dataValidations.add({ range: 'B9:F15', rule: { type: 'decimal', operator: 'between', formula1: 0, formula2: 5 } });
main.getRange('B9:F15').conditionalFormats.addCustom('AND(B9<>"",OR(NOT(ISNUMBER(B9)),B9<0,B9>5))', { fill: '#FCE8E6', font: { color: '#9C1B15', bold: true } });
for (const c of ['C', 'D', 'E', 'F']) {
  main.getRange(`${c}6`).formulas = [[`=IF(COUNT($B$9:$B$15)<7,"Set priorities",IF(OR(MIN($B$9:$B$15)<0,MAX($B$9:$B$15)>5),"Check priorities",IF(SUM($B$9:$B$15)=0,"Choose priorities",IF(COUNT(${c}9:${c}15)<7,"Add ratings",IF(OR(MIN(${c}9:${c}15)<0,MAX(${c}9:${c}15)>5),"Check ratings",SUMPRODUCT($B$9:$B$15,${c}9:${c}15)/SUM($B$9:$B$15))))))`]];
}
main.getRange('A17').values = [['Your choice']];
main.getRange('B17:F17').format.fill = amber;
main.getRange('B17:F17').format.rowHeight = 30;
main.getRange('A19').values = [['Before deciding']];
main.getRange('A19').format.font = { name: 'Arial', size: 11, bold: true, color: green };
main.getRange('A20:A23').values = [
  ['1. Read Product facts and open the current source pages.'],
  ['2. Fill every importance value. Give at least one criterion a value above zero.'],
  ['3. Try the tools, then fill every rating. Use 0 for a criterion you do not need.'],
  ['4. Compare your fit scores and notes. Confirm event requirements before choosing.'],
];
main.getRange('A20:A23').format.font = { name: 'Arial', size: 11, color: muted };
main.getRange('A20:G23').format.rowHeight = 24;
main.getRange('A2:G2').format.borders = { bottom: { style: 'thin', color: '#B5C8BE' } };
main.getRange('A:A').format.columnWidth = 31;
main.getRange('B:B').format.columnWidth = 15;
main.getRange('C:F').format.columnWidth = 18;
main.getRange('G:G').format.columnWidth = 35;

source.getRange('A2').values = [['Documented product facts']];
source.getRange('A2').format.font = { name: 'Arial', size: 16, bold: true, color: green };
source.getRange('A2:G2').format.rowHeight = 30;
source.getRange('A2:G2').format.borders = { bottom: { style: 'thin', color: '#B5C8BE' } };
source.getRange('A3').values = [['Reviewed October 26, 2026. Published by CourtsideView, one of the products compared.']];
source.getRange('A4').values = [['Documentation review; no measured performance winner. Prices, access and features can change.']];
source.getRange('A3:A4').format.font = { name: 'Arial', size: 11, color: muted };
source.getRange('A6:G6').values = [['Product', 'Topic', 'Documentation summary', 'Important limit', null, 'Primary source', 'Reviewed']];
source.getRange('A6:D6').format = { fill: green, font: { name: 'Arial', size: 11, bold: true, color: '#FFFFFF' }, horizontalAlignment: 'center', wrapText: true, rowHeight: 30, borders: { insideVertical: { style: 'thin', color: '#FFFFFF' } } };
source.getRange('F6:G6').format = { fill: green, font: { name: 'Arial', size: 11, bold: true, color: '#FFFFFF' }, horizontalAlignment: 'center', wrapText: true, rowHeight: 30, borders: { insideVertical: { style: 'thin', color: '#FFFFFF' } } };
source.getRange('A7:G30').values = facts.map(([product,topic,summary,limit,url]) => [product,topic,summary,limit,null,url,reviewed]);
source.getRange('A7:G30').format.rowHeight = 74;
source.getRange('A7:D30').format.wrapText = true;
source.getRange('F7:F30').format.wrapText = true;
source.getRange('A7:G30').format.verticalAlignment = 'top';
source.getRange('G7:G30').setNumberFormat('mm/dd/yy');
source.getRange('G7:G30').format.horizontalAlignment = 'right';
source.getRange('F7:F30').format.font = { name: 'Arial', size: 11, color: '#174CA1' };
for (const r of [7,13,19,25]) {
  source.getRange(`A${r}:D${r}`).format.borders = { top: { style: 'thin', color: '#B5C8BE' } };
  source.getRange(`A${r}:A${r+5}`).format.font = { name: 'Arial', size: 11, bold: true, color: green };
}
source.getRange('A:A').format.columnWidth = 19;
source.getRange('B:B').format.columnWidth = 22;
source.getRange('C:C').format.columnWidth = 54;
source.getRange('D:D').format.columnWidth = 51;
source.getRange('E:E').format.columnWidth = 3;
source.getRange('F:F').format.columnWidth = 63;
source.getRange('G:G').format.columnWidth = 14;
source.freezePanes.freezeRows(6);
source.freezePanes.freezeColumns(2);

// Exercise live formulas, then restore the intentionally blank reader inputs.
const qa = [];
const scoreValues = () => main.getRange('C6:F6').values[0];
wb.recalculate();
qa.push({ test: 'blank inputs', actual: scoreValues(), expected: 'Set priorities' });
main.getRange('B9:B15').values = Array.from({length:7}, () => [0]);
qa.push({ test: 'all priorities zero', actual: scoreValues(), expected: 'Choose priorities' });
main.getRange('B9:B15').values = Array.from({length:7}, () => [1]);
qa.push({ test: 'ratings missing', actual: scoreValues(), expected: 'Add ratings' });
main.getRange('C9:F15').values = Array.from({length:7}, () => [5,4,3,2]);
qa.push({ test: 'complete equal priorities', actual: scoreValues(), expected: [5,4,3,2] });
main.getRange('C9').values = [[0]];
qa.push({ test: 'changed one rating', actual: scoreValues(), expected: [30/7,4,3,2] });
main.getRange('B9').values = [[5]];
qa.push({ test: 'changed priority', actual: scoreValues(), expected: [30/11,4,3,2] });
main.getRange('C9').values = [[0.4]];
qa.push({ test: 'decimal rating', actual: scoreValues(), expected: [32/11,4,3,2] });
main.getRange('B9').values = [[0.4]];
qa.push({ test: 'decimal priority', actual: scoreValues(), expected: [30.16/6.4,4,3,2] });
const decimalPreview = await wb.render({sheetName:'Your comparison',range:'A6:G15',scale:1,format:'png'});
await fs.writeFile(path.join(outDir,'decimal-input-preview.png'),new Uint8Array(await decimalPreview.arrayBuffer()));
main.getRange('B9').values = [[-0.1]];
qa.push({ test: 'negative decimal priority', actual: scoreValues(), expected: 'Check priorities' });
main.getRange('B9').values = [['essential']];
qa.push({ test: 'text priority', actual: scoreValues(), expected: 'Set priorities' });
main.getRange('B9').values = [[5]];
main.getRange('C9').values = [['unknown']];
qa.push({ test: 'text rating', actual: scoreValues(), expected: ['Add ratings',4,3,2] });
main.getRange('C9').values = [[-0.1]];
qa.push({ test: 'negative decimal rating', actual: scoreValues(), expected: ['Check ratings',4,3,2] });
main.getRange('C9').values = [[6]];
qa.push({ test: 'out of range rating', actual: scoreValues(), expected: ['Check ratings',4,3,2] });
main.getRange('C9').values = [[null]];
qa.push({ test: 'blank rating remains missing', actual: scoreValues(), expected: ['Add ratings',4,3,2] });
main.getRange('B9:F15').clear({applyTo:'contents'});
wb.recalculate();
for (const q of qa) {
  const expected = Array.isArray(q.expected) ? q.expected : Array(4).fill(q.expected);
  q.passed = q.actual.every((v,i) => typeof expected[i] === 'number' ? Math.abs(v-expected[i]) < 1e-9 : v === expected[i]);
  if (!q.passed) throw new Error(`Formula QA failed: ${JSON.stringify(q)}`);
}
const inspection = await wb.inspect({ kind:'table', range:"'Your comparison'!A6:G15", include:'values,formulas', tableMaxRows:10, tableMaxCols:7, maxChars:4000 });
const errors = await wb.inspect({ kind:'match', searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!', options:{useRegex:true,maxResults:50}, summary:'Final formula error scan', maxChars:3000 });
await fs.writeFile(path.join(outDir,'worksheet-qa.json'), JSON.stringify({qa,inspection:inspection.ndjson,errors:errors.ndjson,finalInputState:main.getRange('B9:F15').values},null,2));
for (const [sheetName, range, file] of [
  ['Your comparison','A1:G23','worksheet-preview.png'],
  ['Product facts','A1:G12','facts-courtsideview-preview.png'],
  ['Product facts','A13:G18','facts-gamechanger-preview.png'],
  ['Product facts','A19:G24','facts-solostats-preview.png'],
  ['Product facts','A25:G30','facts-volleywrite-preview.png'],
]) {
  const preview=await wb.render({sheetName,range,scale:1,format:'png'});
  await fs.writeFile(path.join(outDir,file),new Uint8Array(await preview.arrayBuffer()));
}
const xlsx=await SpreadsheetFile.exportXlsx(wb);
const xlsxPath=path.join(outDir,'volleyball-app-comparison-worksheet.xlsx');
await xlsx.save(xlsxPath);
const csvEscape=v=>`"${String(v??'').replaceAll('"','""')}"`;
const csvRows=[['Criterion','Importance (0-5)',...products.map(p=>`${p} rating (0-5)`),'Your notes'],...criteria.map(c=>[c,'','','','','',''])];
await fs.writeFile(path.join(outDir,'volleyball-app-comparison-worksheet.csv'),'\uFEFF'+csvRows.map(r=>r.map(csvEscape).join(',')).join('\r\n')+'\r\n');
await fs.writeFile(path.join(outDir,'comparison-facts.json'),JSON.stringify({reviewed:'2026-10-26',publisher:'CourtsideView',basis:'Documentation review; no hands-on performance benchmark',facts:facts.map(([product,topic,summary,limit,url])=>({product,topic,summary,limit,url,reviewed:'2026-10-26'}))},null,2));
const reopened=await SpreadsheetFile.importXlsx(await FileBlob.load(xlsxPath));
const persistedMain=reopened.worksheets.getItem('Your comparison');
const persistedScore=persistedMain.getRange('C6:F6').values;
const persistedFormulas=persistedMain.getRange('C6:F6').formulas;
if (!persistedFormulas[0].every(v=>v.startsWith('=IF('))) throw new Error('Export did not retain formulas');
await fs.writeFile(path.join(outDir,'worksheet-roundtrip.json'),JSON.stringify({scores:persistedScore,formulasRetained:true,sheets:(await reopened.inspect({kind:'sheet',include:'id,name'})).ndjson},null,2));
console.log(JSON.stringify({outDir,qaPassed:qa.length,files:await fs.readdir(outDir)}));
