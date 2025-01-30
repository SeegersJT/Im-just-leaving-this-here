import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { FilterOutlined } from '@ant-design/icons';
import MainCardComponent from 'components/card/MainCard.component';
import { CellAlign, CellPadding, CellStyle, CellWeight } from 'utils/constants/Table.enum';
import { Utils } from 'utils/Utils';
import Loading from 'components/loading/Loading.component';

function renderTitle(title) {
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Typography variant="h5">{title}</Typography>
    </Grid>
  );
}

function renderDescription(description) {
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Typography variant="body2">{description}</Typography>
      <Grid item />
    </Grid>
  );
}

function renderToolbar(selectable, toolbarData, selectedItemsCount, handleOnToolbarClick) {
  return (
    selectable && (
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 }
          }
        ]}
      >
        {selectedItemsCount > 0 ? (
          <Typography sx={{ flex: '1 1 50%' }} color="inherit" variant="subtitle1" component="div">
            {selectedItemsCount} selected
          </Typography>
        ) : (
          <Typography sx={{ flex: '1 1 50%' }} variant="h6" id="tableTitle" component="div">
            No Rows Selected
          </Typography>
        )}
        {selectedItemsCount > 0 ? (
          <>
            {toolbarData.map((toolbar, index) => {
              return (
                <Tooltip key={index} title={toolbar.title}>
                  <IconButton color={toolbar.iconColor} onClick={() => handleOnToolbarClick(index)}>
                    {toolbar.icon}
                  </IconButton>
                </Tooltip>
              );
            })}
          </>
        ) : (
          <IconButton disabled>
            <FilterOutlined />
          </IconButton>
        )}
      </Toolbar>
    )
  );
}

function renderSearchBar(selectable, searchable, searchQuery, handleSearchChange) {
  return (
    searchable && (
      <Grid
        item
        xs={12}
        md={7}
        lg={4}
        sx={[
          {
            ml: { sm: 2 },
            mr: { xs: 1, sm: 1 },
            mt: selectable ? 0 : 2,
            mb: 1
          }
        ]}
      >
        <TextField label="Search" variant="outlined" fullWidth value={searchQuery} onChange={handleSearchChange} />
      </Grid>
    )
  );
}

function renderLoader() {
  return <Loading />;
}

function renderDataTable(
  visibleCellData,
  height,
  selectable,
  singleSelect,
  selectedItems,
  headerModifiers,
  sortBy,
  dense,
  sortByIndex,
  sortTableByIndexAndDirection,
  columnModifiers,
  emptyRows,
  pageOptions,
  cellData,
  page,
  rowsPerPage,
  dataLoading,
  filterSearchedText,
  handleSelectAll,
  handleOnPageChange,
  handleRowClick,
  handleOnRowsPerPageChange
) {
  return (
    <>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: dataLoading ? 'flex' : 'block',
          justifyContent: dataLoading ? 'center' : 'none',
          alignItems: dataLoading ? 'center' : 'none',
          maxWidth: '100%',
          height: height,
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        {dataLoading ? (
          renderLoader()
        ) : visibleCellData.length > 0 ? (
          <Table aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                {renderTableHeaderSelectAll(selectable, singleSelect, selectedItems.length, filterSearchedText().length, handleSelectAll)}
                {renderTableHeaders(headerModifiers, sortBy, sortByIndex, sortTableByIndexAndDirection)}
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableRows(columnModifiers, visibleCellData, selectable, singleSelect, selectedItems, handleRowClick)}
              {renderEmptyRows(emptyRows, dense)}
            </TableBody>
          </Table>
        ) : (
          renderNoDataFound()
        )}
      </TableContainer>
      {renderTablePagination(pageOptions, cellData.length, page, rowsPerPage, handleOnPageChange, handleOnRowsPerPageChange)}
    </>
  );
}

function renderTableHeaderSelectAll(selectable, singleSelect, selectedCount, cellDataLength, handleSelectAll) {
  return (
    selectable && (
      <TableCell padding="checkbox">
        <Checkbox
          sx={{ p: 0 }}
          color="primary"
          disabled={singleSelect}
          indeterminate={selectedCount > 0 && selectedCount < cellDataLength}
          checked={cellDataLength > 0 && selectedCount === cellDataLength}
          onChange={(event) => handleSelectAll(event.target.checked)}
        />
      </TableCell>
    )
  );
}

function renderTableHeaders(headerModifiers, sortBy, sortByIndex, sortTableByIndexAndDirection) {
  return headerModifiers.map((header) => (
    <TableCell
      key={header.id}
      align={header.align ? header.align : CellAlign.LEFT}
      padding={header.padding ? header.padding : CellPadding.NORMAL}
      sortDirection={sortByIndex === header.id ? sortBy : false}
      sx={{
        fontWeight: header.weight ? header.weight : CellWeight.REGULAR,
        fontStyle: header.style ? header.style : CellStyle.NORMAL,
        color: header.color ? header.color : ''
      }}
    >
      <TableSortLabel
        active={sortByIndex === header.id}
        direction={sortByIndex === header.id ? sortBy : 'asc'}
        onClick={() => sortTableByIndexAndDirection(header.id)}
      >
        {header.label}
        {sortByIndex === header.id ? (
          <Box component="span" sx={visuallyHidden}>
            {sortBy === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  ));
}

function renderTableCellSelect(selectable, isItemSelected) {
  return (
    selectable && (
      <TableCell padding="checkbox">
        <Checkbox sx={{ p: 0 }} color="primary" checked={isItemSelected} />
      </TableCell>
    )
  );
}

function renderTableRows(columnModifiers, visibleCellData, selectable, singleSelect, selectedItems, handleRowClick) {
  return visibleCellData.map((row, rowIndex) => {
    const isItemSelected = selectedItems.includes(row.uuid);

    return (
      <TableRow
        hover
        role="checkbox"
        sx={{ cursor: selectable ? 'pointer' : 'inherit', backgroundColor: row.rowColor ? row.rowColor : 'inherit' }}
        tabIndex={-1}
        key={rowIndex}
        selected={isItemSelected}
        onClick={() => selectable && handleRowClick(row.uuid, isItemSelected, singleSelect)}
      >
        {renderTableCellSelect(selectable, isItemSelected)}
        {Object.entries(row).map(([key, value]) => {
          console.log('==================');
          console.log('key', key);
          console.log('value', value);
          if (key !== 'uuid' && key !== 'rowColor') {
            const modifier = columnModifiers.find((columModifier) => columModifier.id === key);
            console.log('columnModifiers', columnModifiers);
            console.log('modifier', modifier);
            if (!Utils.isUndefined(modifier) && !Utils.isNull(modifier)) {
              return (
                <TableCell
                  key={key}
                  align={modifier.align ? modifier.align : CellAlign.LEFT}
                  padding={modifier.padding ? modifier.padding : CellPadding.NORMAL}
                  sx={{
                    fontWeight: modifier.weight ? modifier.weight : CellWeight.REGULAR,
                    fontStyle: modifier.style ? modifier.style : CellStyle.NORMAL,
                    color: modifier.color ? modifier.color : ''
                  }}
                >
                  {value === null ? 'N/A' : value}
                </TableCell>
              );
            }
          }
        })}
      </TableRow>
    );
  });
}

function renderEmptyRows(emptyRows, dense) {
  return (
    emptyRows > 0 && (
      <TableRow
        style={{
          height: (dense ? 40 : 48) * emptyRows
        }}
      >
        <TableCell colSpan={6} />
      </TableRow>
    )
  );
}

function renderNoDataFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        textAlign: 'center'
      }}
    >
      <Typography variant="h5" color="textSecondary">
        No data found
      </Typography>
    </Box>
  );
}

function renderTablePagination(pageOptions, cellDataLength, page, rowsPerPage, handleOnPageChange, handleOnRowsPerPageChange) {
  return (
    <TablePagination
      rowsPerPageOptions={pageOptions}
      component="div"
      count={cellDataLength}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleOnPageChange}
      onRowsPerPageChange={handleOnRowsPerPageChange}
    />
  );
}

function DataTable({
  title,
  description,
  headerModifiers,
  columnModifiers,
  data,
  dataLoading,
  toolbarData = [],
  height = '550px',
  rows = 10,
  pageOptions = [10, 25, 100],
  selectable,
  singleSelect,
  searchable,
  dense,
  onFormatCellData,
  onToolbarClick
}) {
  const [cellData, setCellData] = useState(data);
  const [sortByIndex, setSortByIndex] = useState(0);
  const [sortBy, setSortBy] = useState(false);
  const [sortedCellData, setSortedCellData] = useState([]);
  const [visibleCellData, setVisibleCellData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rows);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  console.log('cellData', cellData);

  const filterSearchedText = useCallback(() => {
    const filteredData = cellData.filter((row) =>
      Object.values(row)
        .filter((value) => typeof value === 'string')
        .some((value) => value.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return filteredData;
  }, [cellData, searchQuery]);

  useEffect(() => {
    setCellData(
      data.map((cell) => ({
        uuid: Utils.generateUUID(),
        ...cell
      }))
    );
  }, [data]);

  useEffect(() => {
    const filteredData = filterSearchedText();

    setSortedCellData(
      [...filteredData].sort(getComparator(sortBy, sortByIndex)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [sortBy, sortByIndex, cellData, page, rowsPerPage, searchQuery, filterSearchedText]);

  useEffect(() => {
    setVisibleCellData(() => onFormatCellData(sortedCellData));
  }, [sortedCellData, onFormatCellData]);

  useEffect(() => {
    setSelectedItems([]);
  }, [searchQuery]);

  const getComparator = (order, orderBy) => {
    if (!order) return () => 0;

    return (a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];

      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    };
  };

  const sortTableByIndexAndDirection = (index) => {
    if (sortByIndex === index) {
      if (sortBy === 'asc') {
        setSortBy('desc');
      } else if (sortBy === 'desc') {
        setSortByIndex(null);
      } else {
        setSortBy('asc');
      }
    } else {
      setSortByIndex(index);
      setSortBy('asc');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleRowClick = (uuid, isItemSelected, singleSelect) => {
    if (singleSelect) {
      if (isItemSelected) {
        setSelectedItems([]);
      } else {
        setSelectedItems([uuid]);
      }
    } else {
      if (isItemSelected) {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== uuid));
      } else {
        setSelectedItems([...selectedItems, uuid]);
      }
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const filteredItems = filterSearchedText();
      setSelectedItems(filteredItems.map((singleCellData) => singleCellData.uuid));
    } else {
      setSelectedItems([]);
    }
  };

  const handleOnPageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleOnRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnToolbarClick = (index) => {
    const filterSelectedItems = cellData.filter((item) => selectedItems.includes(item.uuid));
    onToolbarClick(index, filterSelectedItems);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cellData.length) : 0;

  return (
    <>
      {renderTitle(title)}
      {renderDescription(description)}
      <MainCardComponent sx={{ mt: 2 }} content={false}>
        <Box>
          {renderToolbar(selectable, toolbarData, selectedItems.length, handleOnToolbarClick)}
          {renderSearchBar(selectable, searchable, searchQuery, handleSearchChange)}
          {renderDataTable(
            visibleCellData,
            height,
            selectable,
            singleSelect,
            selectedItems,
            headerModifiers,
            sortBy,
            dense,
            sortByIndex,
            sortTableByIndexAndDirection,
            columnModifiers,
            emptyRows,
            pageOptions,
            cellData,
            page,
            rowsPerPage,
            dataLoading,
            filterSearchedText,
            handleSelectAll,
            handleOnPageChange,
            handleRowClick,
            handleOnRowsPerPageChange
          )}
        </Box>
      </MainCardComponent>
    </>
  );
}

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  headerModifiers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      align: PropTypes.oneOf(Object.values(CellAlign)),
      padding: PropTypes.oneOf(Object.values(CellPadding)),
      weight: PropTypes.oneOf(Object.values(CellWeight)),
      style: PropTypes.oneOf(Object.values(CellStyle)),
      color: PropTypes.string,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  columnModifiers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      align: PropTypes.oneOf(Object.values(CellAlign)),
      padding: PropTypes.oneOf(Object.values(CellPadding)),
      weight: PropTypes.oneOf(Object.values(CellWeight)),
      style: PropTypes.oneOf(Object.values(CellStyle)),
      color: PropTypes.string
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dataLoading: PropTypes.bool,
  toolbarData: PropTypes.arrayOf(PropTypes.object),
  height: PropTypes.string,
  rows: PropTypes.number,
  pageOptions: PropTypes.arrayOf(PropTypes.number),
  selectable: PropTypes.bool,
  singleSelect: PropTypes.bool,
  searchable: PropTypes.bool,
  dense: PropTypes.bool,
  onFormatCellData: PropTypes.func.isRequired,
  onToolbarClick: PropTypes.func
};

export default DataTable;
