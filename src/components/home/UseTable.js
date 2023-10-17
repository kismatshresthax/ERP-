import React, { useState } from "react";
import {Table,makeStyles,TableHead,TableRow,TableCell,TablePagination,TableSortLabel } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
const useStyles = makeStyles((theme) => ({


  tableContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  table: {

   
    "& thead th": {
      fontWeight: "700",
      backgroundColor: "#ffffff",
      lineHeight: "19.5px",
      color: "#647488",
        fontsize:"13px",
   
      // zIndex: 9,
    
    },
    "& tbody td": {
      fontWeight: "300",
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('sm')]: {
        display: '',
        textAlign: '',
      },
    },
    "& tbody tr:hover": {
      //backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 0,
    },
  },
}));

//   table: {
//     "& thead th": {
//       fontWeight: "600",
//       // color: theme.palette.primary.main,
//       color: "#ffffff",
//       // backgroundColor: theme.palette.primary.light,
//       backgroundColor: "#454545",
//       position: "sticky",
//       top: "33px",
//       zIndex: 9,
//     },
//     "& tbody td": {
//       fontWeight: "300",
//     },
//     "& tbody tr:hover": {
//       backgroundColor: "#fffbf2",
//       cursor: "pointer",
//     },
//   },
// }));





function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}



export default function UseTable(records, headCells, filterFn) {
  const classes = useStyles();
  const pages = [ 10,20,50,100];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const TblContainer = (props) => (
    <Table stickyHeader aria-label="sticky table"  className={classes.table} 
    style={{ 
      minWidth: 650,
      overflowX: 'auto',
      
       position:"sticky",
      }} 
    size="small">
      {props.children}
    </Table>
  );
  const TblHead = (props) => {
    const handleSortRequest = cellId => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId)
  }
    

    return (
    <TableHead>
      <TableRow>
          {
              headCells.map(headCell => (
                  <TableCell   key={headCell.id}
                      sortDirection={orderBy === headCell.id ? order : false}
                      
                    
                      >
                      {headCell.disableSorting ? headCell.label :
                          <TableSortLabel
                              active={orderBy === headCell.id}
                              direction={orderBy === headCell.id ? order : 'asc'}
                              onClick={() => { handleSortRequest(headCell.id) }}>
                              {headCell.label}
                          </TableSortLabel>
                      }
                  </TableCell>))
          }
      </TableRow>
  </TableHead>)
  };
  const handleChangePage = (e, newPage) => {
 

    setPage(newPage);
    
  };

  const handleChangeRowsPerPage = (event) => {
  
    setRowsPerPage(parseInt(event.target.value, 10));
 
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - records.length) : 0;
  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}

      onPageChange={handleChangePage}
     onRowsPerPageChange ={handleChangeRowsPerPage}
     ActionsComponent={TablePaginationActions}
    />
  );

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  //const currentpage=page * rowsPerPage;
  const recordsAfterPagingAndSorting = () => {
    if(filterFn.fn(records).length<records.length ){
      console.log(filterFn.fn(records));
      return filterFn.fn(records) 
    }
else{
  return stableSort(filterFn.fn(records) ,getComparator(order, orderBy)).slice(page*rowsPerPage, (page+1)* rowsPerPage);
}
    
    

};
  return {
    TblContainer,
    TblHead,
    TblPagination, 
    recordsAfterPagingAndSorting,

  };
}
