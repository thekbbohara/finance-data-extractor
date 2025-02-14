"use client"
import React from 'react';
import { Button, Select, Modal, Image as AntImage, message, Input, Switch } from "antd";
import { useState } from "react";
import Dropzone from "react-dropzone";
import ReactCrop, { PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { cn } from '@/utils/cn';

import { convertToThousands } from '@/utils/math';
import { ExtractedTable } from './ExtractedTable';
import { allOptions, ExtractedChecks, ExtractedData, labelNames, otherSectorOptions, sectorOptions } from '@/lib/consts/fde';



const ImageDropzone = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<PixelCrop>();
  const [croppedAreas, setCroppedAreas] = useState<{
    crop: PixelCrop;
    label: string;
    sector: string;
    croppedImage: string;
  }[]>([]);
  const [selectedLabel, setSelectedLabel] = useState('incomeStatement');
  const [selectedSector, setSelectedSector] = useState<null | string>(null);
  const [otherSelectedSector, setotherSelectedSector] = useState<null | string>(null);
  const [isSelectionModalVisible, setIsSelectionModalVisible] = useState(false);
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [extractedChecks, setExtractedChecks] = useState<ExtractedChecks>(null);
  const [isInThousands, setIsInThousands] = useState(false);
  //const [fy, setFy] = useState<null | string>(null);
  //const [quarter, setQuarter] = useState<null | string>(null);
  const [userInstructionInput, setUserInstructionInput] = useState<{ [key: string]: string }>({})

  const handleUpload = async (acceptedFiles: any) => {
    try {
      if (!acceptedFiles || acceptedFiles.length === 0) {
        message.error('Please select an image file');
        return;
      }

      const uploadedFile = acceptedFiles[0];

      if (!uploadedFile.type.startsWith('image/')) {
        message.error('Please upload an image file');
        return;
      }

      setFile(uploadedFile);

      const originalReader = new FileReader();
      originalReader.onload = (e) => {
        if (e.target?.result) {
          setOriginalImage(e.target.result.toString());
          setImage(e.target.result.toString());
        }
      };
      originalReader.readAsDataURL(uploadedFile);

    } catch (error: any) {
      console.error("Error uploading file:", error);
      message.error(`File upload failed: ${error?.message ?? error}`);
      setFile(null);
      setImage(null);
      setOriginalImage(null);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setImage(null);
    setOriginalImage(null);
    setCroppedAreas([]);
    setExtractedData(null);
    setSelectedSector(null)
    setotherSelectedSector(null)
  };

  const handleCropComplete = (crop: PixelCrop) => {
    setCrop(crop);
  };

  const handleSaveCrop = () => {
    if (crop && imgRef && originalImage) {
      const labelExists = croppedAreas.some(area => area.label === selectedLabel);
      if (labelExists) {
        message.error('This label is already used for another selection');
        return;
      }

      const canvas = document.createElement('canvas');
      const scaleX = imgRef.naturalWidth / imgRef.width;
      const scaleY = imgRef.naturalHeight / imgRef.height;

      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        message.error('Failed to create crop context');
        return;
      }

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(
          img,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );

        const croppedImageUrl = canvas.toDataURL('image/png', 1.0);
        if (selectedSector === null) return
        if (selectedSector === "others" && otherSelectedSector === null) return
        const sector = selectedSector === "others"
          ? `${selectedSector}-${otherSelectedSector}`
          : selectedSector
        setCroppedAreas([...croppedAreas, {
          crop,
          label: selectedLabel,
          sector: sector,
          croppedImage: croppedImageUrl
        }]);
        setCrop(undefined);
        setIsSelectionModalVisible(false);
      };
      img.src = originalImage;
    }
  };

  const handleRemoveCrop = (index: number) => {
    const newCroppedAreas = [...croppedAreas];
    newCroppedAreas.splice(index, 1);
    setCroppedAreas(newCroppedAreas);
  };

  const handleExtract = async (label: string) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [label]: true })); // Set loading for the specific label

      const area = croppedAreas.find((a) => a.label === label);
      if (!area) {
        message.error('No selected area found for this label.');
        return;
      }

      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: area.croppedImage,
          label: area.label,
          sector: area.sector,
          userInstruction: userInstructionInput[area.label] || ""
        })
      });

      const result = await response.json();
      if (!result.data) {
        message.error(`Extraction failed for ${label}`);
        return;
      }

      setExtractedData((prevData) => ({
        ...prevData,
        [label]: isInThousands
          ? result.data
          : result.data.map((item: { [key: string]: string }) => {
            const [key, value] = Object.entries(item)[0];
            return label === "ratios" && key.includes("count")
              ? { [key]: value }
              : { [key]: convertToThousands(value) };
          })
      }));

      setExtractedChecks((prevChecks) => ({
        ...prevChecks,
        [label]: result.checks ?? {}
      }));

      message.success(`Extraction completed for ${label}`);
    } catch (error) {
      console.error(`Error extracting data for ${label}:`, error);
      message.error(`Failed to extract data for ${label}`);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [label]: false })); // Reset loading for the label
    }
  };

  const handleDataChange = (label: string, index: number, key: string, val: string) => {
    const newExtractedData = JSON.parse(JSON.stringify(extractedData));
    newExtractedData[label][index][key] = val;
    setExtractedChecks(prev => ({
      ...(prev ?? {}), // If prev is null, default to an empty object
      [label]: {
        ...((prev && prev[label]) || {}), // Default to an empty object if prev[label] doesn't exist
        [key]: "true"
      }
    }));
    setExtractedData(newExtractedData);
  };
  //
  //const handleSaveData = () => {
  //  if (extractedData) {
  //    console.log('Saving extracted data:', extractedData);
  //    message.success('Data saved successfully!');
  //  }
  //};
  const usedLabels = croppedAreas.map(area => area.label);
  const availableOptions = selectedSector ? allOptions[selectedSector]?.filter(option => !usedLabels.includes(option.value)) : [{ value: "invalid_sector", label: "invalid sector" }];

  return (
    <div className="max-w-7xl mx-auto mb-4 p-8 bg-white rounded-xl shadow-lg mt-8">

      <div className="flex flex-col space-y-6">
        {!image && (
          <Dropzone onDrop={handleUpload} accept={{ 'image/*': [] }}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center space-y-4 cursor-pointer border-2 border-dashed border-blue-400 p-12 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300"
              >
                <input {...getInputProps()} className="hidden" />
                <div className="text-center">
                  <p className="text-xl text-blue-700 font-semibold mb-3">
                    Drag and drop data image file here
                  </p>
                  <p className="text-sm text-blue-600">
                    or click to select from your computer
                  </p>
                </div>
              </div>
            )}
          </Dropzone>
        )}
        {image && (
          <div className="space-y-8">
            <div className="flex items-center justify-between gap-4 bg-gray-50 p-6 rounded-xl flex-wrap">
              {/* Left Side Buttons */}
              <div className="flex items-center gap-4 flex-wrap">
                <Button
                  type="primary"
                  disabled={selectedSector === null || (selectedSector === 'others' && otherSelectedSector === null)}
                  onClick={() => setIsSelectionModalVisible(true)}
                  size="large"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Add Label
                </Button>
                <Button onClick={handleClearFile} danger size="large">
                  Clear Image
                </Button>
                <Button type="default" size="large" onClick={() => setPreviewVisible(true)}>
                  View Full Image
                </Button>
                <Select
                  key="section-select"
                  value={selectedSector || "select sector"}
                  onChange={setSelectedSector}
                  style={{ width: 200 }}
                  options={sectorOptions}
                  size="large"
                />
                {selectedSector === "others" && <Select
                  key="other-section-select"
                  value={otherSelectedSector || "select idk"}
                  onChange={setotherSelectedSector}
                  style={{ width: 200 }}
                  options={otherSectorOptions}
                  size="large"
                />}
              </div>

              {/* Right Side Toggle Switch */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-gray-800 font-medium">Data in 000s</span>
                <Switch
                  checked={isInThousands}
                  onChange={checked => setIsInThousands(checked)}
                />
              </div>
            </div>

            {croppedAreas.length > 0 && (
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Labeled Selections</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {croppedAreas.map((area, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold text-gray-800 text-lg">
                            {labelNames[area?.label as string]}
                          </span>
                          <Button
                            danger
                            onClick={() => handleRemoveCrop(index)}
                          >
                            Remove
                          </Button>
                        </div>
                        <AntImage
                          src={area.croppedImage}
                          alt={area.label}
                          className="w-full object-contain rounded-lg"
                          preview={true}
                        />
                      </div>
                      {/** extract */}
                      <div className='flex gap-2 mt-2'>
                        <Input
                          value={userInstructionInput[area.label]}
                          onChange={(e) => {
                            setUserInstructionInput(p => ({
                              ...p,
                              [area.label]: e.currentTarget.value
                            }));
                          }}
                          placeholder='Your instructions.' type='text' className='flex w-full'
                          disabled={!file || croppedAreas.length === 0 || loadingStates[area.label] || false}
                        />


                        <Button
                          type="primary"
                          onClick={() => handleExtract(area.label)}
                          size="large"
                          loading={loadingStates[area.label] || false} // Show loading only for this label
                          className={cn(
                            "submit-button px-8 py-4 rounded-xl text-white font-bold border transition-all duration-300",
                            file && croppedAreas.length > 0
                              ? "bg-[#4CAF50] hover:bg-[#45A049] border-[#4CAF50]"
                              : "cursor-not-allowed bg-gray-500 hover:bg-gray-500 border-gray-500"
                          )}
                          disabled={!file || croppedAreas.length === 0 || loadingStates[area.label]}
                        >
                          {loadingStates[area.label] ? 'Extracting...' : 'Extract Data'}
                        </Button>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {extractedData && (
              <div className="bg-gray-50 p-8 rounded-xl w-full">
                <ExtractedTable data={extractedData} selectedSector={selectedSector} otherSelectedSector={otherSelectedSector} handleDataChange={handleDataChange} extractedChecks={extractedChecks} />
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        open={isSelectionModalVisible}
        onCancel={() => setIsSelectionModalVisible(false)}
        width={1200}
        centered
        footer={[
          <Select
            key="label-select"
            value={selectedLabel}
            onChange={setSelectedLabel}
            style={{ width: 200 }}
            options={availableOptions}
            size="large"
          />,
          <Button
            key="save"
            type="primary"
            onClick={handleSaveCrop}
            disabled={!crop}
            size="large"
            className='bg-blue-500'
          >
            Save Selection
          </Button>
        ]}
      >
        <div className="border rounded-xl p-6 bg-white">
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={handleCropComplete}
          >
            <img
              ref={ref => setImgRef(ref)}
              src={image!}
              alt="Upload"
              style={{ maxWidth: '100%', width: 'auto', height: 'auto' }}
              className="mx-auto"
            />
          </ReactCrop>
        </div>
      </Modal>

      <AntImage
        style={{ display: 'none' }}
        preview={{
          visible: previewVisible,
          src: originalImage!,
          onVisibleChange: (visible) => setPreviewVisible(visible),
        }}
      />
    </div>
  );
};

export default ImageDropzone;
