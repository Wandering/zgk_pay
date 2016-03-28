package cn.thinkjoy.zgk.market.util;

import com.google.common.collect.Lists;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Excel�ļ�����������
 */
public class ExcelUtil {
	private final static Logger logger = LoggerFactory
			.getLogger(ExcelUtil.class);
	private final static String EXCEL_2003 = ".xls";
	private final static String EXCEL_2007 = ".xlsx";
	private final static String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
	private final static SimpleDateFormat dateFormate = new SimpleDateFormat(
			DEFAULT_DATE_FORMAT);

	private Workbook workbook = null;
	private Sheet sheet = null;

    public Sheet getSheet() {
        return sheet;
    }

    public void setSheet(Sheet sheet) {
        this.sheet = sheet;
    }

    /**
	 * ��ȡ��ǰ�����Ĺ�����
	 */
	public Workbook getWorkbook() {
		return workbook;
	}

	/**
	 * 
	 * ͨ��POI��ʽ��ȡExcel,����xls��xlsx
	 * 
	 * @param exceFlFile
	 * @throws Exception
	 */
	// public static List<String[]> readExcelPOI(MultipartFile file)
	// throws Exception {
	//
	// if (null != file) {
	// String fileName = file.getOriginalFilename();
	// fileName = fileName.toLowerCase();
	// if (fileName.toLowerCase().endsWith(EXCEL_2003)) {
	// return readExcelPOI2003(file);
	// }
	// if (fileName.toLowerCase().endsWith(EXCEL_2007)) {
	// return readExcelPOI2007(file);
	// }
	// }
	// return null;
	// }

	/**
	 * ��ȡExcel2003�ı�
	 * 
	 * @param excelFile
	 * @return
	 * @throws Exception
	 */
	// private static List<String[]> readExcelPOI2003(MultipartFile file)
	// throws Exception {
	// List<String[]> dataList = new ArrayList<String[]>();
	// InputStream input = file.getInputStream();
	// HSSFWorkbook workBook = new HSSFWorkbook(input);
	//
	// HSSFSheet sheet = workBook.getSheetAt(0);
	// if (sheet == null) {
	// return dataList;
	// }
	// Integer rowNum = sheet.getLastRowNum() + 1;
	// Integer cellNum = (int) sheet.getRow(0).getLastCellNum();
	// for (int j = 1; j < rowNum; j++) {
	// HSSFRow row = sheet.getRow(j);
	// if (row == null) {
	// continue;
	// }
	// String[] datas = new String[cellNum];
	// for (int k = 0; k < cellNum; k++) {
	// HSSFCell cell = row.getCell(k);
	// if (cell == null) {
	// continue;
	// }
	// if (cell != null) {
	// cell.setCellType(HSSFCell.CELL_TYPE_STRING);
	// String cellValue = cell.getStringCellValue();
	// datas[k] = cellValue;
	// }
	// }
	// dataList.add(datas);
	// }
	// return dataList;
	// }

	// ----------------------POI begin--------------------------//
	/**
	 * 
	 * @param file
	 * @param maxCell
	 *            �������,��ʼ��Ϊ0���Դ�����
	 * @return key��0��ʼ��maxCell
	 */
	public static List<Map<Integer, String>> poiRead(MultipartFile file,
			int maxCell) {
		InputStream input = null;
		try {
			input = file.getInputStream();
		} catch (IOException e) {
			logger.warn("��ȡ�ϴ��ļ�IO�쳣", e);
		}
		if (null == input) {
			return Collections.emptyList();
		}
		String fileName = file.getOriginalFilename();
		fileName = fileName.toLowerCase();
		if (fileName.endsWith(EXCEL_2003)) {
			return poiReadXls(input, maxCell);
		}
		if (fileName.endsWith(EXCEL_2007)) {
			return poiReadXlsx(input, maxCell);
		}
		return Collections.emptyList();
	}

	/**
	 * �ļ��ϴ���ȡ��[{title=value},{title=value}]
	 * 
	 * @param file
	 * @return
	 */
	public static List<Map<String, String>> poiRead(MultipartFile file) {
		InputStream input = null;
		try {
			input = file.getInputStream();
		} catch (IOException e) {
			logger.warn("��ȡ�ϴ��ļ�IO�쳣", e);
		}
		if (null == input) {
			return Collections.emptyList();
		}
		String fileName = file.getOriginalFilename();
		fileName = fileName.toLowerCase();
		if (fileName.endsWith(EXCEL_2003)) {
			return poiReadXls(input);
		}
		if (fileName.endsWith(EXCEL_2007)) {
			return poiReadXlsx(input);
		}
		return Collections.emptyList();
	}

	/**
	 * ֱ�Ӷ�ȡ�ļ�
	 * 
	 * @param file
	 * @return
	 */
	public static List<Map<String, String>> poiRead(File file) {
		InputStream input = null;
		try {
			input = FileUtils.openInputStream(file);
		} catch (IOException e) {
			logger.warn("��ȡ�ϴ��ļ�IO�쳣", e);
		}
		if (null == input) {
			return Collections.emptyList();
		}
		String fileName = file.getName();
		fileName = fileName.toLowerCase();
		if (fileName.endsWith(EXCEL_2003)) {
			return poiReadXls(input);
		}
		if (fileName.endsWith(EXCEL_2007)) {
			return poiReadXlsx(input);
		}
		return Collections.emptyList();
	}

	/**
	 * �����ļ�·����ȡ
	 * 
	 * @param fileName
	 * @param maxCell
	 * @return
	 */
	public static List<Map<Integer, String>> poiRead(String fileName,
			int maxCell) {
		InputStream input = null;
		try {
			input = new FileInputStream(fileName);
		} catch (IOException e) {
			logger.warn("��ȡ�ϴ��ļ�IO�쳣", e);
		}
		if (null == input) {
			return Collections.emptyList();
		}
		fileName = fileName.toLowerCase();
		if (fileName.endsWith(EXCEL_2003)) {
			return poiReadXls(input, maxCell);
		}
		if (fileName.endsWith(EXCEL_2007)) {
			return poiReadXlsx(input, maxCell);
		}
		return Collections.emptyList();
	}

	/**
	 * ��ȡ2003��ʽ��excel�ļ�
	 * 
	 * @param input
	 *            ����Ϊnull,�ڲ��ر���
	 *            ����Ϊnull
	 * @return
	 */
	private static List<Map<Integer, String>> poiReadXls(InputStream input,
			int maxCell) {
		HSSFWorkbook workBook = null;
		try {
			workBook = new HSSFWorkbook(input);
			HSSFSheet sheet = workBook.getSheetAt(0);
			if (null == sheet) {
				return Collections.emptyList();
			}
			return readSheet(sheet, maxCell);
		} catch (IOException e) {
			logger.error("��ȡexcel�ļ�IO�쳣", e);
		} finally {
			IOUtils.closeQuietly(input);
		}
		return Collections.emptyList();
	}

	private static List<Map<String, String>> poiReadXls(InputStream input) {
		HSSFWorkbook workBook = null;
		try {
			workBook = new HSSFWorkbook(input);
			HSSFSheet sheet = workBook.getSheetAt(0);
			if (null == sheet) {
				return Collections.emptyList();
			}
			return readSheet(sheet);
		} catch (IOException e) {
			logger.error("��ȡexcel�ļ�IO�쳣", e);
		} finally {
			IOUtils.closeQuietly(input);
		}
		return Collections.emptyList();
	}

	/**
	 * �½�һ������д��Excel������
	 * 
	 * @param isXls
	 *            �Ƿ�Ϊ2003��
	 * @return
	 */
	public ExcelUtil createBook(boolean isXls) {
		if (null == workbook) {
			if (isXls) {
				workbook = new HSSFWorkbook();
			} else {
				workbook = new XSSFWorkbook();
			}
		}
		return this;
	}

	/**
	 * ��������������дExcel
	 * 
	 * @param isXls
	 * @param input
	 * @return
	 */
	public ExcelUtil createBook(boolean isXls, InputStream input) {
		if (null == workbook) {
			if (isXls) {
				createXlsBook(input);
			} else {
				createXlsxBook(input);
			}
		}
		return this;
	}

	public ExcelUtil createXlsBook(InputStream input) {
		try {
			workbook = new HSSFWorkbook(input);
		} catch (IOException e) {
			logger.warn("����2003�汾��Excel�쳣:" + e.getMessage(), e);
		}
		return this;
	}

	/**
	 * 
	 * @param input
	 * @return
	 */
	public ExcelUtil createXlsxBook(InputStream input) {
		try {
			workbook = new XSSFWorkbook(input);
		} catch (IOException e) {
			logger.warn("����2007�汾��Excel�쳣:" + e.getMessage(), e);
		}
		return this;
	}

	/**
	 * ����������,�ɴ������
	 * 
	 * @param sheetname
	 * @return
	 */
	public ExcelUtil createSheet(String... sheetname) {
		if (null == workbook) {
			throw new IllegalArgumentException("workbook ����Ϊnull.");
		}
		if (null == sheetname || sheetname.length < 1) {
			this.sheet = workbook.createSheet("������");
		} else {
			this.sheet = workbook.createSheet(sheetname[0]);
		}
		return this;
	}

	/**
	 * �½�һ������д��Excel������
	 * 
	 * @param isXls
	 *            �Ƿ�Ϊ2003��
	 * @param sheetname
	 *            ����������
	 * @return
	 */
	public ExcelUtil createBookAndSheet(boolean isXls, String... sheetname) {
		createBook(isXls).createSheet(sheetname);
		return this;
	}

	/**
	 * ���������д������,2003��2007ͨ��
	 * 
	 * @param rowNum
	 *            �б�ţ���0��ʼ
	 * @param contents
	 *            ����
	 * @return
	 */
	public boolean writeRow(int rowNum, Object... contents) {
		return writeRow(rowNum, null, contents);
	}

	/**
	 * ���������д������,2003��2007ͨ��
	 * 
	 * @param rowNum
	 *            �б�ţ���0��ʼ
	 * @param contents
	 *            ����
	 * @return
	 */
	public boolean writeRowList(int rowNum, List<String> contents) {
		return writeRow2(rowNum, null, contents);
	}

	/**
	 * ���������д������,2003��2007ͨ��
	 * 
	 * @param rowNum
	 *            �б�ţ���0��ʼ
	 * @param rowStyle
	 *            ����ʽ
	 * @param contents
	 *            ����
	 * @return
	 */
	public boolean writeRow(int rowNum, CellStyle rowStyle, Object... contents) {
		if (null == sheet) {
			return false;
		}
		// ����һ��
		Row row = sheet.createRow(rowNum);
		int length = contents.length;
		for (int column = 0; column < length; column++) {
			Cell cell = row.createCell(column, Cell.CELL_TYPE_STRING);
			cell.setCellValue(objectToString(contents[column]));
		}
        if (null != rowStyle) {
            row.getCell(0).setCellStyle(rowStyle);
        }

		return true;
	}

	public static String objectToString(Object str) {
		return str == null ? "" : str.toString();
	}

	/**
	 * ���������д������,2003��2007ͨ��
	 * 
	 * @param rowNum
	 *            �б�ţ���0��ʼ
	 * @param rowStyle
	 *            ����ʽ
	 * @param contents
	 *            ����
	 * @return
	 */
	public boolean writeRow2(int rowNum, CellStyle rowStyle,
			List<String> contents) {
		if (null == sheet) {
			return false;
		}
		// ����һ��
		Row row = sheet.createRow(rowNum);
		if (null != rowStyle) {
			row.setRowStyle(rowStyle);
		}
		int length = contents.size();
		for (int column = 0; column < length; column++) {
			Cell cell = row.createCell(column, Cell.CELL_TYPE_STRING);
			cell.setCellValue(contents.get(column));
		}
		return true;
	}

	/**
	 * д����������Ѿ�flush();
	 * 
	 * @param out
	 * @return
	 */
	public boolean writeTo(OutputStream out) {
		if (null == workbook) {
			throw new IllegalArgumentException("workbook ����Ϊnull.");
		}
		if (null == out) {
			throw new IllegalArgumentException("out ����Ϊnull.");
		}
		try {
			workbook.write(out);
			out.flush();
			return true;
		} catch (IOException e) {
			// Auto-generated catch block
		}
		return false;
	}

	/**
	 * ��ȡ�����
	 * 
	 * @return
	 */
	public InputStream getInputStream() {
		if (null == workbook) {
			throw new IllegalArgumentException("workbook ����Ϊnull.");
		}
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ByteArrayInputStream swapStream = null;
		try {
			workbook.write(baos);
			swapStream = new ByteArrayInputStream(baos.toByteArray());
		} catch (IOException e) {
			// Auto-generated catch block
		}
		return swapStream;
	}

	/**
	 * ��ȡ2007��ʽ��excel�ļ�
	 * 
	 * @param input
	 *            ����Ϊnull,�ڲ��ر���
	 * @param titles
	 *            ����Ϊnull
	 * @return
	 */
	private static List<Map<Integer, String>> poiReadXlsx(InputStream input,
			int maxCell) {
		XSSFWorkbook workBook = null;
		try {
			workBook = new XSSFWorkbook(input);
			XSSFSheet sheet = workBook.getSheetAt(0);
			if (null == sheet) {
				return Collections.emptyList();
			}
			return readSheet(sheet, maxCell);
		} catch (IOException e) {
			logger.error("��ȡexcel�ļ�IO�쳣", e);
		} finally {
			IOUtils.closeQuietly(input);
		}
		return Collections.emptyList();
	}

	private static List<Map<String, String>> poiReadXlsx(InputStream input) {
		XSSFWorkbook workBook = null;
		try {
			workBook = new XSSFWorkbook(input);
			XSSFSheet sheet = workBook.getSheetAt(0);
			if (null == sheet) {
				return Collections.emptyList();
			}
			return readSheet(sheet);
		} catch (IOException e) {
			logger.error("��ȡexcel�ļ�IO�쳣", e);
		} finally {
			IOUtils.closeQuietly(input);
		}
		return Collections.emptyList();
	}

	/**
	 * ��ȡһ������������ݣ�ע�ⲻ���ȡ��һ��
	 * 
	 * @param sheet
	 *            ����Ϊnull
	 * @param maxCell
	 *            ��0��ʼ��ȡ1��
	 * @return
	 */
	private static List<Map<Integer, String>> readSheet(Sheet sheet, int maxCell) {
		// ����foreachѭ�� ����sheet�е�������
		List<Map<Integer, String>> excelData = new LinkedList<Map<Integer, String>>();
		int rowNum = 0;
		Iterator<Row> rows = sheet.rowIterator();
		while (rows.hasNext()) {
			Row row = rows.next();
			rowNum++;
			if (rowNum == 1) {
				// ����ȡ��һ��
				continue;
			}
			// ����row�е����з���
			Map<Integer, String> rowData = new LinkedHashMap<Integer, String>();
			Iterator<Cell> cells = row.cellIterator();
			while (cells.hasNext()) {
				Cell cell = cells.next();
				// ������0��ʼ
				int cellSize = cell.getColumnIndex();
				if (cellSize > maxCell) {
					break;
				}
				// һ�е�ÿһ������
				rowData.put(cellSize, getCellText(cell));
			}
			// ÿһ������
			excelData.add(rowData);
		}
		return excelData;
	}

	/**
	 * keyʹ�ñ�ͷ�ı���ʽ��ȡ
	 * 
	 * @param sheet
	 * @return
	 */
	private static List<Map<String, String>> readSheet(Sheet sheet) {
		// ����foreachѭ�� ����sheet�е�������
		List<Map<String, String>> excelData = new LinkedList<Map<String, String>>();
		Iterator<Row> rows = sheet.rowIterator();
		List<String> titleData = getRowText(sheet.getRow(0));
		int rowNum = 0;
		while (rows.hasNext()) {
			Row row = rows.next();
			rowNum++;
			if (rowNum == 1) {
				continue;
			}
			int cellNum = 0;
			Map<String, String> rowData = new LinkedHashMap<String, String>();
			for (String title : titleData) {
				rowData.put(title, getCellText(row.getCell(cellNum)));
				cellNum++;
			}
			excelData.add(rowData);
		}
		return excelData;
	}

	/**
	 * ��ȡһ�����ݣ��м��п����޷���ȡ���ʺ����ڶ�ȡ��ͷ�ĵط�
	 * 
	 * @param row
	 * @return
	 */
	private static List<String> getRowText(Row row) {
		List<String> data = Lists.newLinkedList();
		Iterator<Cell> cells = row.cellIterator();
		while (cells.hasNext()) {
			Cell cell = cells.next();
			data.add(getCellText(cell));
		}
		return data;
	}

	/**
	 * ���ַ�����ʽ��ȡ��Ԫ������
	 * 
	 * @param cell
	 * @return
	 */
	private static String getCellText(Cell cell) {
		if (null == cell) {
			return "";
		}
		if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
			if (HSSFDateUtil.isCellDateFormatted(cell)) {
				return dateFormate.format(cell.getDateCellValue());
			}
		}
		cell.setCellType(Cell.CELL_TYPE_STRING);
		String text = trimToEmpty(cell.getStringCellValue());
		return text;
	}

	private static String trimToEmpty(String str) {
		return str == null ? "" : str.trim();
	}

	// ----------------------POI end--------------------------//
	/**
	 * 
	 * ��ȡExcel2007�ı�
	 * 
	 * @param excelFile
	 * @return
	 * @throws Exception
	 * 
	 */
	// private static List<String[]> readExcelPOI2007(MultipartFile file)
	// throws Exception {
	// InputStream input = file.getInputStream();
	// List<String[]> dataList = new ArrayList<String[]>();
	// XSSFWorkbook workBook = new XSSFWorkbook(input);
	// XSSFSheet sheet = workBook.getSheetAt(0);
	// if (sheet == null) {
	// return dataList;
	// }
	//
	// Integer rowNum = sheet.getLastRowNum() + 1;
	// Integer cellNum = (int) sheet.getRow(0).getLastCellNum();
	// for (int i = 1; i < rowNum; i++) {
	// XSSFRow row = sheet.getRow(i);
	// if (row == null) {
	// continue;
	// }
	// String[] datas = new String[cellNum];
	// for (int j = 0; j < cellNum; j++) {
	// XSSFCell cell = row.getCell(j);
	// if (cell == null) {
	// continue;
	// }
	// if (cell != null) {
	// cell.setCellType(XSSFCell.CELL_TYPE_STRING);
	// String cellValue = cell.getStringCellValue();
	// datas[j] = cellValue;
	// }
	// }
	// dataList.add(datas);
	// }
	// return dataList;
	// }
}
