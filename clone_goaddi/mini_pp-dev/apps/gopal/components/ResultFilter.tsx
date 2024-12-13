"use client";
import React, { useEffect, useRef, useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

type EachResultBoxProp = React.PropsWithChildren<{ className?: string }>;
const EachResultBox = ({ children, className = "" }: EachResultBoxProp) => (
  <div className={`border-b-[#E4E7EC] border-[1px]`}>
    <div className={`px-[1.681rem] py-[2.027rem]  ${className}`}>
      {children}
    </div>
  </div>
);

type ResultFilterAccordionProp = React.PropsWithChildren<{ title: string }>;
const ResultFilterAccordion = ({
  title,
  children,
}: ResultFilterAccordionProp) => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <div
        onClick={handleOpen}
        className="flex pb-[1.25rem] items-center justify-between"
      >
        <p className="">{title}</p>
        {open ? <CaretUp size={20} /> : <CaretDown size={20} />}
      </div>
      {open ? children : ""}
    </div>
  );
};

//main stuff
type ResultFilterType = {
  schema: {
    name: string;
    schemaType:
      | "SelectMultipleTabs"
      | "RadioTabs"
      | "SelectCheckBoxTabs"
      | "SelectCheckBoxTabs__hideValue"
      | "minmax";
    data: string[] | { id: string | number; label: string; value: string }[];
  }[];
  onChange: (recentUpdatedData: any) => void;
};

type ResultFilterStore = {
  store: {
    key: string;
    data:
      | string[]
      | {
          id: string | number;
          label: string;
          value: string | { min: string; max: string };
        }[];
  }[];
};
const ResultFilter = ({ schema, onChange }: ResultFilterType) => {
  const [store, setStore] = useState<ResultFilterStore["store"]>([]);
  const [clearTrigger, setClearTrigger] = useState(false); // the value does not matthew react tigger is what we need on state change

  const handleSetStore = ({
    pickedValues,
    name,
  }: {
    pickedValues: any;
    name: string;
  }) => {
    const availableKeys = store.map((d) => d.key);
    if (!availableKeys.includes(name)) {
      setStore([...store, { data: pickedValues, key: name }]);
      return;
    }
    setStore([
      ...store.map((storeD) => {
        console.log({ key: storeD.key, name });
        if (storeD.key == name) {
          console.log("Added Newly", pickedValues);
          return { data: pickedValues, key: name };
        }
        console.log("Nothing Newly");
        // nothing
        return storeD;
      }),
    ]);
  };
  
  const handleClear = () => {
    //this function is to tigger the children component to rest thier own states both ui and react state
    setStore([]); // this just clears the global store
    setClearTrigger(!clearTrigger);
  };

  useEffect(() => {
    onChange(store);
  }, [store]);
  return (
    <div className="bg-[#FFFFFF] rounded-sm w-[100%]">
      <EachResultBox className="flex items-center justify-between">
        <p className="text-[#1D2433] font-[700] text-[1rem] ">
          <img src="" alt="" />
          <span>Filter your result</span>
        </p>
        <p
          className="text-primary600 font-[700] text-[0.875rem]  cursor-pointer"
          onClick={handleClear}
        >
          Clear
        </p>
      </EachResultBox>

      {schema.map((d, index) => (
        <div key={index}>
          {d.schemaType === "SelectMultipleTabs" ? (
            <ResultFilterSelectMultipleTabs
              onchange={(pickedValues) => {
                // console.log({pickedValues})
                handleSetStore({
                  name: d.name,
                  pickedValues: pickedValues,
                });
              }}
              // @ts-ignore
              values={d.data}
              title={d.name}
              clearTrigger={clearTrigger}
            />
          ) : (
            ""
          )}
          {d.schemaType === "RadioTabs" ? (
            <ResultFilterSelectRadioTabs
              title={d.name}
              // @ts-ignore
              values={d.data}
              onchange={(pickedValues) => {
                handleSetStore({
                  name: d.name,
                  pickedValues: pickedValues,
                });
              }}
              clearTrigger={clearTrigger}
            />
          ) : (
            ""
          )}
          {d.schemaType === "SelectCheckBoxTabs" ? (
            <ResultFilterSelectCheckBoxTabs
              title={d.name}
              onchange={(pickedValues) => {
                handleSetStore({
                  name: d.name,
                  pickedValues: pickedValues,
                });
              }}
              clearTrigger={clearTrigger}
              // @ts-ignore
              values={d.data}
            />
          ) : (
            ""
          )}
          {d.schemaType === "SelectCheckBoxTabs__hideValue" ? (
            <ResultFilterSelectCheckBoxTabs
              title={d.name}
              onchange={(pickedValues) => {
                handleSetStore({
                  name: d.name,
                  pickedValues: pickedValues,
                });
              }}
              // @ts-ignore
              values={d.data}
              hideValues={true}
              clearTrigger={clearTrigger}
            />
          ) : (
            ""
          )}
          {d.schemaType === "minmax" ? (
            <ResultFilterSelectMinMax
              clearTrigger={clearTrigger}
              title={d.name}
              onchange={(value) => {
                handleSetStore({
                  name: d.name,
                  pickedValues: value,
                });
              }}
            />
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultFilter;

// Below Are Different Varations of Component that will exisit in ResultFilter
// start of ResultFilterSelectMultipleTabs
type ResultFilterSelectMultipleTabsProp = {
  values: string[];
  onchange: (pickedValues: string[]) => void;
  title: string;
  clearTrigger: boolean;
};
const ResultFilterSelectMultipleTabs = ({
  clearTrigger,
  values,
  onchange,
  title,
}: ResultFilterSelectMultipleTabsProp) => {
  const [pickedData, setPickedData] = useState<string[]>([]);
  const handlePick = (picked: string) => {
    let pickedValues = [...pickedData];
    if (pickedValues.includes(picked)) {
      pickedValues = pickedValues.filter((d) => d !== picked);
    } else {
      pickedValues.push(picked);
    }

    onchange(pickedValues);

    setPickedData(pickedValues);
  };

  useEffect(() => {
    setPickedData([]);
  }, [clearTrigger]); //on change of clearTrigger
  return (
    <EachResultBox>
      <ResultFilterAccordion title={title}>
        <div className="flex flex-wrap gap-[0.688rem]">
          {values.map((value, index) => (
            <p
              key={index}
              onClick={() => {
                handlePick(value);
              }}
              className={`${pickedData.includes(value) ? "text-white bg-primary600" : "text-[#647995] bg-[#F0F2F5]"} rounded-[4px] p-[0.5rem] font-[500] cursor-pointer`}
            >
              {value}
            </p>
          ))}
        </div>
      </ResultFilterAccordion>
    </EachResultBox>
  );
};
// end of ResultFilterSelectMultipleTabs

type ResultFilterSelectRadioTabsProps = {
  values: { label: string; value: string; id: string | number }[];
  onchange: (pickedValue: {
    label: string;
    value: string;
    id: string | number;
  }) => void;
  title: string;
  clearTrigger: boolean;
};

const ResultFilterSelectRadioTabs = ({
  values,
  title,
  onchange,
  clearTrigger,
}: ResultFilterSelectRadioTabsProps) => {
  const ref = useRef(null);
  const handleClearData = () => {
    if (ref?.current) {
      // @ts-ignore
      const allInput = ref.current?.querySelectorAll("input");
      allInput?.forEach((d: any) => {
        d.checked = false;
      });
    }
  };
  useEffect(() => {
    handleClearData();
  }, [clearTrigger]);
  return (
    <EachResultBox>
      <ResultFilterAccordion title={title}>
        <div className="flex flex-col gap-[1.125rem]" ref={ref}>
          {values.map((value, index) => (
            <div className="flex items-center justify-between">
              <label
                // htmlFor={`${value.id}`}
                htmlFor={`${value.id}__${title}__radiobox`}
                className="flex items-center gap-[0.625rem] radio_container"
              >
                <input
                  type="radio"
                  value={value.value}
                  onChange={() => {
                    onchange(value);
                  }}
                  name={title}
                  id={`${value.id}__${title}__radiobox`}

                  // id={`${value.id}`}
                />
                <div className="text-[#1D2433] font-[500] text-[1rem]">
                  {value.label}
                </div>
                <span className="radio_checkmark"></span>
              </label>

              <p className="text-[1rem] font-[500]">{value.value}</p>
            </div>
          ))}
        </div>
      </ResultFilterAccordion>
    </EachResultBox>
  );
};

type ResultFilterSelectCheckBoxTabsProps = {
  values: { label: string; value: string; id: string | number }[];
  onchange: (
    pickedValues: { label: string; value: string; id: string | number }[],
  ) => void;
  title: string;
  hideValues?: boolean;
  clearTrigger: boolean;
};

const ResultFilterSelectCheckBoxTabs = ({
  values,
  onchange,
  title,
  hideValues = false,
  clearTrigger,
}: ResultFilterSelectCheckBoxTabsProps) => {
  const [pickedData, setPickedData] = useState<
    ResultFilterSelectCheckBoxTabsProps["values"]
  >([]);

  const handlePick = (pickedValue: {
    label: string;
    value: string;
    id: string | number;
  }) => {
    const ids = pickedData.filter((d) => `${d.id}`).map((d) => d.id);
    let data;
    if (ids.includes(`${pickedValue.id}`)) {
      console.log("INcludes");
      // remove this data
      data = [...pickedData.filter((d) => d.id !== pickedValue.id)];
      setPickedData(data);
    } else {
      console.log("Not INcludes");

      data = [...pickedData, pickedValue];
      setPickedData(data);
    }
    onchange(data);
  };
  const ref = useRef(null);
  const handleClearData = () => {
    setPickedData([]);
    if (ref?.current) {
      // @ts-ignore
      const allInput = ref.current?.querySelectorAll("input");
      console.log({ allInput });
      allInput?.forEach((d: any) => {
        d.checked = false;
      });
    }
  };
  useEffect(() => {
    handleClearData();
  }, [clearTrigger]);

  return (
    <EachResultBox>
      <ResultFilterAccordion title={title}>
        <div className="flex flex-col gap-[1.125rem]" ref={ref}>
          {values.map((value, index) => (
            <div className="flex items-center justify-between">
              <label
                htmlFor={`${value.id}__${title}__checkBox`}
                className="flex items-center gap-[0.625rem] custom_checkbox_container"
              >
                <input
                  type={"checkbox"}
                  value={value.value}
                  // id={`${value.id}`}
                  id={`${value.id}__${title}__checkBox`}
                  onChange={() => {
                    handlePick(value);
                  }}
                  name={title}
                  className="custom_checkbox"
                />
                <span
                  className="custom_checkmark"
                  // style={{''}}
                ></span>
                <div className="text-[#1D2433] font-[500] text-[1rem]">
                  {value.label}
                </div>
              </label>
              {hideValues ? (
                ""
              ) : (
                <p className="text-[1rem] font-[500]">{value.value}</p>
              )}
            </div>
          ))}
        </div>
      </ResultFilterAccordion>
    </EachResultBox>
  );
};

type ResultFilterSelectMinMaxProps = {
  onchange: (value: { min: string; max: string }) => void;
  title: string;
  clearTrigger: boolean;
};
const ResultFilterSelectMinMax = ({
  title,
  onchange,
  clearTrigger,
}: ResultFilterSelectMinMaxProps) => {
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("0");

  const handleClearData = () => {
    setMin("0");
    setMax("0");
  };
  useEffect(() => {
    handleClearData();
  }, [clearTrigger]);
  return (
    <EachResultBox>
      <ResultFilterAccordion title={title}>
        <div className="flex items-center justify-between gap-[0.563rem] ">
          <div className="w-[50%] overflow-hidden rounded-[4px]">
            <label htmlFor="" className="font-[500] text-[0.75rem]">
              Min Price
            </label>
            <div className="border-[1px] border-[#98A2B3] overflow-hidden rounded-[4px] relative">
              <input
                value={min}
                onChange={(e) => {
                  setMin(e.target.value);
                  onchange({ max, min: e.target.value });
                }}
                type="number"
                className="px-[0.875rem] py-[0.5rem] w-[100%]"
                placeholder={`Enter ${title}`}
              />
              {/* <img src="/assets/money.svg" className='absolute right-0 top-[50%]' alt="" /> */}
            </div>
          </div>
          <p className="translate-y-[10px]">-</p>
          <div className="w-[50%]  ">
            <label htmlFor="" className="font-[500] text-[0.75rem]">
              Max Price
            </label>
            <div className="border-[1px] border-[#98A2B3] overflow-hidden rounded-[4px]">
              <input
                value={max}
                onChange={(e) => {
                  setMax(e.target.value);

                  onchange({ max: e.target.value, min });
                }}
                type="text"
                className="px-[0.875rem] py-[0.5rem] w-[100%]"
                placeholder={`Enter ${title}`}
              />
            </div>
          </div>
        </div>
      </ResultFilterAccordion>
    </EachResultBox>
  );
};
