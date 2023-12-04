import React from "react";
import Popper from "@mui/material/Popper";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Link from "next/link";

const LanguageSelector = (props: any) => {
  return (
    <Popper {...props} arrow="true" placement="top">
      <div className="flex flex-col items-start justify-center bg-white absolute top-14 left-[59.2rem] w-[15rem] px-4 py-4">
        <FormControl className="w-full">
          <div className="text-xs">
            Change language{" "}
            <Link href={"#"} className="text-[10px] text-[#007185]">
              Learn more
            </Link>
          </div>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="English - EN"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="English - EN"
              control={
                <Radio
                  sx={{
                    color: "#f08804",
                    "&.Mui-checked": {
                      color: "#f08804",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 22,
                    },
                  }}
                />
              }
              label={
                <div className="flex flex-col justify-center text-[12px] hover:text-[#f08804] hover:underline">
                  English - EN
                </div>
              }
            />
            <FormControlLabel
              value="español - ES"
              control={
                <Radio
                  sx={{
                    color: "#f08804",
                    "&.Mui-checked": {
                      color: "#f08804",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 22,
                    },
                  }}
                />
              }
              label={
                <span className="flex items-center justify-center text-[12px] hover:text-[#f08804] hover:underline">
                  español - ES
                </span>
              }
            />
            <FormControlLabel
              value="العربية - AR"
              control={
                <Radio
                  sx={{
                    color: "#f08804",
                    "&.Mui-checked": {
                      color: "#f08804",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 22,
                    },
                  }}
                />
              }
              label={
                <span className="flex items-center justify-center text-[12px] hover:text-[#f08804] hover:underline">
                  العربية - AR
                </span>
              }
            />
            <FormControlLabel
              value="Deutsch - DE"
              control={
                <Radio
                  sx={{
                    color: "#f08804",
                    "&.Mui-checked": {
                      color: "#f08804",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 22,
                    },
                  }}
                />
              }
              label={
                <span className="flex items-center justify-center text-[12px] hover:text-[#f08804] hover:underline">
                  Deutsch - DE
                </span>
              }
            />
            <FormControlLabel
              value="עברית - HE"
              control={
                <Radio
                  sx={{
                    color: "#f08804",
                    "&.Mui-checked": {
                      color: "#f08804",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 22,
                    },
                  }}
                />
              }
              label={
                <span className="flex items-center justify-center text-[12px] hover:text-[#f08804] hover:underline">
                  עברית - HE
                </span>
              }
            />
            <FormControlLabel
              value="한국어 - KO"
              control={
                <Radio
                  sx={{
                    color: "#f08804",
                    "&.Mui-checked": {
                      color: "#f08804",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 22,
                    },
                  }}
                />
              }
              label={
                <span className="flex items-center justify-center text-[12px] hover:text-[#f08804] hover:underline">
                  한국어 - KO
                </span>
              }
            />
            <FormControlLabel
              value="português - PT"
              control={
                <Radio
                  sx={{
                    color: "#f08804",
                    "&.Mui-checked": {
                      color: "#f08804",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 22,
                    },
                  }}
                />
              }
              label={
                <span className="flex items-center justify-center text-[12px] hover:text-[#f08804] hover:underline">
                  português - PT
                </span>
              }
            />
            <FormControlLabel
              value="中文 (简体) - ZH"
              control={
                <Radio
                  sx={{
                    color: "#f08804",
                    "&.Mui-checked": {
                      color: "#f08804",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 22,
                    },
                  }}
                />
              }
              label={
                <span className="flex items-center justify-center text-[12px] hover:text-[#f08804] hover:underline">
                  中文 (简体) - ZH
                </span>
              }
            />
            <FormControlLabel
              value="中文 (繁體) - ZH"
              control={
                <Radio
                  sx={{
                    color: "#f08804",
                    "&.Mui-checked": {
                      color: "#f08804",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: 22,
                    },
                  }}
                />
              }
              label={
                <span className="flex items-center justify-center text-[12px] hover:text-[#f08804] hover:underline">
                  中文 (繁體) - ZH
                </span>
              }
            />
          </RadioGroup>
          <Divider className="my-3" />
          <div className="flex flex-col space-y-2">
            <div className="text-xs">
              Change Currency{" "}
              <Link href={"#"} className="text-[10px] text-[#007185]">
                Learn more
              </Link>
            </div>
            <div className="flex items-center justify-between text-xs space-x-4">
              <span className="">$ - USD - U.S. Dollar</span>
              <Link href={"#"} className="text-[10px] text-[#007185]">
                Change
              </Link>
            </div>
          </div>
          <Divider className="my-3" />
          <div className="flex text-xs items-start">
            <div className="flex mr-2">
              <img
                className="w-4 object-contain cursor-pointer"
                src="/us-flag.png"
                alt="Flag"
              />
            </div>
            You are shopping on Amazon.com
          </div>
          <div className="flex justify-center mt-3">
            <Link href={"#"} className="text-[#007185] text-[13px] underline">
              Change country/region
            </Link>
          </div>
        </FormControl>
      </div>
    </Popper>
  );
};

export default LanguageSelector;
