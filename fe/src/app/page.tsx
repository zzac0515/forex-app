"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Divider,
  FormControl,
  Select,
  MenuItem,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/joy/CircularProgress";
import AppsIcon from "@mui/icons-material/Apps";
import TocIcon from "@mui/icons-material/Toc";
import moment, { Moment } from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getCurrencies } from "@/services/currencyService";
import { getRatesList, RateItem } from "@/services/ratesService";
import { formatDate } from "@/shared-functions/sharedFunctions";
import SharedDataGrid from "@/components/dataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface Currency {
  id: number;
  name: string;
  code: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Each card animation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.1,
      ease: "easeOut",
    },
  },
};
export default function Home() {
  const now = new Date();
  const [queryDate, setQueryDate] = useState<string>(formatDate(now));
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [baseCurrency, setBaseCurrency] = useState(1);
  const [rates, setRates] = useState<RateItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [height, setHeight] = useState<number>(50);
  const [totalData, setTotalData] = useState<number>(0);
  const [toggleView, setToggleView] = useState<number>(0); // Grid: 0, Table: 1
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(totalData / ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const selectedCurrency = currencies.find((item) => item.id === baseCurrency);
  const [renderedIds, setRenderedIds] = useState<Set<string>>(new Set());
  const updatedRates = useRef<RateItem[]>([]);

  useEffect(() => {
    const newIds = new Set(renderedIds);
    rates.forEach((item) => {
      if (!newIds.has(item.against_currency)) {
        newIds.add(item.against_currency);
      }
    });
    setRenderedIds(newIds);
    updatedRates.current = rates;
  }, [rates]);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "base_currency", headerName: "Base Currency", flex: 1 },
    { field: "against_currency", headerName: "Against Currency", flex: 1 },
    { field: "rate", headerName: "Rate", flex: 1 },
    {
      field: "effective_date",
      headerName: "Effective Date",
      flex: 1,
      renderCell: (params) => <span>{formatDate(params.value)}</span>,
    },
  ];

  const fetchRates = async () => {
    try {
      setLoading(true);
      const data = await getRatesList(queryDate, baseCurrency, 12, page);

      // If is grid and not first page
      if (toggleView === 0 && page !== 1) {
        // Append (Grid View)
        setRates((prev) => [...prev, ...data.data]);
      } else {
        // Display only the return (Table View)
        setRates(data.data);
      }
      // setRates((prev) => [...prev, ...data.data]);
      setTotalData(data.totalCount);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch rates", err);
      setLoading(false);
    }
  };

  function handleToggleView() {
    setToggleView((prev) => {
      if (prev === 0) {
        setHeight(0);
        return 1;
      } else {
        setHeight(50);
        return 0;
      }
    });
    setPage(1);
    setRenderedIds(new Set());
  }

  // scroll to fetch data
  useEffect(() => {
    // Do nothing if not grid view
    if (toggleView !== 0) return;

    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (nearBottom && !loading && page < totalPages) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toggleView, loading, page, totalPages]);

  // onload
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
      } catch (err) {
        console.error("Failed to load currencies", err);
      }
    };
    fetchData();
  }, []);

  // onload and on change of query date and base currency
  useEffect(() => {
    fetchRates();
  }, [queryDate, baseCurrency, page]);

  const handleBaseCurrencyChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    setBaseCurrency(value);
    setRenderedIds(new Set());
    setRates([]);
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleDateChange = (value: Moment | null) => {
    // reset page
    setRates([]);
    setPage(1);
    setQueryDate(formatDate(value));
    setRenderedIds(new Set());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="flex flex-1 justify-center items-center min-h-screen w-full ">
        <CircularProgress color="primary" size="lg" variant="soft" />
      </div>
    );

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-[calc(100vh+${height}px)] h-full w-full px-36 py-8 gap-4`}
    >
      <span className="bg-gray-800 font-bold text-gray-200 text-3xl px-2 py-1 rounded-lg w-full">
        Another Forex Site
      </span>{" "}
      <div className="flex justify-between items-center w-full">
        {/* Date filter */}
        <div className="flex gap-x-2 items-center">
          <span className="font-bold text-xl">Rates as of:</span>
          <div className="w-[200px]">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label={null}
                value={moment(queryDate)}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
        {/* View Toggle */}
        <Tooltip title={toggleView === 0 ? "Table View" : "Grid View"}>
          <IconButton
            onClick={handleToggleView}
            aria-label="Toggle View"
            size="large"
          >
            <AnimatePresence mode="wait" initial={false}>
              {toggleView === 0 ? (
                <motion.span
                  key="table"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <TocIcon />
                </motion.span>
              ) : (
                <motion.span
                  key="grid"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <AppsIcon />
                </motion.span>
              )}
            </AnimatePresence>
          </IconButton>
        </Tooltip>
        {/* Base Currency Filter */}
        <div className="flex gap-x-2 items-center">
          <span className="font-bold text-xl">Base Currency: </span>
          <FormControl>
            <Select
              size="small"
              className="w-[200px]"
              labelId="currency-label"
              id="currency-select"
              value={baseCurrency}
              onChange={
                handleBaseCurrencyChange
                // (e) => {
                // setBaseCurrency(e.target.value);
                // setRenderedIds(new Set());
                // setRates([]);
                // setPage(1); // reset to page 1
                // window.scrollTo({ top: 0, behavior: "smooth" });
                // }
              }
            >
              {currencies.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name} ({item.code})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {/* Data Display: Grid */}
      <div className="w-full h-full flex-1 flex flex-col justify-start">
        {toggleView === 0 && (
          <Box>
            {totalData <= 0 ? (
              <div className="flex flex-grow justify-center h-full text-black text-3xl">
                No Data. 😢
              </div>
            ) : (
              <>
                <div className="flex w-full text-center justify-center font-bold pb-4">
                  {selectedCurrency?.name} ({selectedCurrency?.code}) Against
                </div>
                <motion.div
                  className="grid grid-cols-6 gap-8 w-full"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {rates.map((item, index) => {
                    const isNew = !renderedIds.has(item.against_currency);
                    return (
                      <motion.div
                        key={`against_${item.against_currency}`}
                        className="bg-white text-gray-600 text-center rounded-3xl shadow-lg p-4 transition"
                        initial={isNew ? "hidden" : false}
                        animate={isNew ? "visible" : false}
                        variants={cardVariants}
                        layout
                        transition={{ delay: index * 0.02 }}
                      >
                        <span className="text-2xl">
                          {item.against_currency}
                        </span>
                        <Divider className="w-full" />
                        <span className="text-2xl font-bold">{item.rate}</span>
                      </motion.div>
                    );
                  })}
                  {/* {rates.map((item) => (
                    <motion.div
                      key={`against_${item.against_currency}`}
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
                      }}
                      className="text-gray-600 flex flex-col justify-center items-center text-center shadow-xl rounded-3xl bg-white"
                    >
                      <span className="px-12 py-4 text-2xl">
                        {item.against_currency}
                      </span>
                      <Divider className="w-full" />
                      <span className="px-12 py-4 text-2xl font-bold">
                        {item.rate}
                      </span>
                    </motion.div>
                  ))} */}
                </motion.div>
                <div className="flex w-full justify-end mt-4">
                  <span className="text-black">
                    Showing {rates.length} of {totalData} Records
                  </span>
                </div>
              </>
            )}
          </Box>
        )}
        {/* Data display: Table */}
        <AnimatePresence mode="wait">
          {toggleView === 1 && (
            <motion.div
              key="shared-datagrid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full h-full rounded-2xl overflow-hidden"
            >
              <SharedDataGrid
                page={page}
                rows={rates}
                dataLength={totalData}
                itemsPerPage={ITEMS_PER_PAGE}
                columns={columns}
                onPageChange={(newPage) => {
                  console.log("showthis", newPage);
                  setPage(newPage + 1);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
