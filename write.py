from xlrd import open_workbook
import xlwt
import sys

# wb = open_workbook('data.xlsx')
wb2 = xlwt.Workbook()
sh = wb2.add_sheet("sheet1")
sh.write(0,0, sys.argv[1])

# for s in wb.sheets():
    # #print 'Sheet:',s.name
    # values = []
    # for row in range(s.nrows):
        # col_value = []
        # for col in range(s.ncols):
			# value  = (s.cell(row,col).value)
			# try : value = str(int(value))
			# except : pass
	# col_value.append(value)
	# values.append(col_value)
	
# print values[0][0]
print 'Argument List:', str(sys.argv[1])
wb2.save("data.xls")