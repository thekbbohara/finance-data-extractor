"use client"
import React from 'react';
import { Button, Select, Modal, Image as AntImage, message, Input } from "antd";
import { useState } from "react";
import Dropzone from "react-dropzone";
import ReactCrop, { PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { cn } from '@/utils/cn';
import { balanceSheetDict, cashFlowDict, profitLossDict } from '@/lib/gemini/config/dict';

const dataDict = (key: string): string => {
  const name = { ...cashFlowDict, ...profitLossDict, ...balanceSheetDict }[key];
  return name ?? "";
};

const ImageDropzone = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<PixelCrop>();
  const [croppedAreas, setCroppedAreas] = useState<{
    crop: PixelCrop;
    label: string;
    croppedImage: string;
  }[]>([]);
  const [selectedLabel, setSelectedLabel] = useState('profitandloss');
  const [isSelectionModalVisible, setIsSelectionModalVisible] = useState(false);
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<{ [key: string]: { [key: string]: string } } | null>(null);

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

        setCroppedAreas([...croppedAreas, {
          crop,
          label: selectedLabel,
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

  const handleExtract = async () => {
    try {
      setLoading(true);
      const results: { [key: string]: { [key: string]: string } } = {};
      for (const area of croppedAreas) {
        const response = await fetch('/api/extract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image: area.croppedImage,
            label: area.label
          })
        });

        const result = await response.json();
        if (result.data) {
          results[area.label] = result.data;
        }
      }

      setExtractedData(results);
      return results;

    } catch (error) {
      console.error("Error extracting data:", error);
      message.error("Failed to extract data from images");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleDataChange = (label: string, index: number, key: string, val: string) => {
    const newExtractedData = JSON.parse(JSON.stringify(extractedData));
    newExtractedData[label][index][key] = val;
    setExtractedData(newExtractedData);
  };

  const handleSaveData = () => {
    if (extractedData) {
      console.log('Saving extracted data:', extractedData);
      message.success('Data saved successfully!');
    }
  };

  const usedLabels = croppedAreas.map(area => area.label);
  const availableOptions = [
    { value: 'profitandloss', label: 'Profit and Loss' },
    { value: 'balancestatement', label: 'Balance Statement' },
    { value: 'cashflow', label: 'Cash Flow' },
  ].filter(option => !usedLabels.includes(option.value));

  return (
    <div className="max-w-7xl mx-auto mb-4 p-8 bg-white rounded-xl shadow-lg mt-8">
      <div className="flex flex-col space-y-6">
        {!image ? (
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
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <Button
                  type="primary"
                  onClick={() => setIsSelectionModalVisible(true)}
                  size="large"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Add Label
                </Button>
                <Button
                  onClick={handleClearFile}
                  danger
                  size="large"
                >
                  Clear Image
                </Button>
                <Button
                  type="default"
                  size="large"
                  onClick={() => setPreviewVisible(true)}
                >
                  View Full Image
                </Button>
              </div>
            </div>

            {croppedAreas.length > 0 && (
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Labeled Selections</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {croppedAreas.map((area, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-gray-800 text-lg">{area.label}</span>
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
                  ))}
                </div>
              </div>
            )}
            {extractedData && (
              <div className="bg-gray-50 p-8 rounded-xl w-full">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Extracted Data (Click cells to edit)</h3>
                {Object.entries(extractedData).map(([label, data]: [string, any]) => (
                  <div key={label} className="mb-8">
                    <h1 className="text-lg font-medium mb-4">
                      <strong>
                        {{ profitandloss: "Income Statement", balancestatement: "Balance Statement", cashflow: "Cash Flows" }[label]}
                      </strong></h1>
                    <table border={1} cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <th>Particulars</th>
                          <th>2081/82</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item: { [key: string]: string }, id: number) =>
                          Object.entries(item).map(([key, val]: [string, string]) => (
                            <tr key={id + key}>
                              <td>{dataDict(key) || key}</td>
                              <td>
                                <Input
                                  value={val}
                                  onChange={e => handleDataChange(label, id, key, e.target.value)}
                                  className="w-full"
                                />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                ))}
                <Button
                  type="primary"
                  onClick={handleSaveData}
                  size="large"
                  className="mt-6 bg-blue-500 hover:bg-blue-600"
                >
                  Save Data
                </Button>
              </div>
            )}
          </div>
        )}

        <Button
          type="primary"
          onClick={handleExtract}
          size="large"
          loading={loading}
          className={cn(
            "submit-button px-8 py-4 rounded-xl text-white font-bold border transition-all duration-300",
            file && croppedAreas.length > 0
              ? "bg-[#4CAF50] hover:bg-[#45A049] border-[#4CAF50]"
              : "cursor-not-allowed bg-gray-500 hover:bg-gray-500 border-gray-500"
          )}
          disabled={!file || croppedAreas.length === 0 || loading}
        >
          {loading ? 'Extracting...' : 'Extract Data'}
        </Button>

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
    </div>
  );
};

export default ImageDropzone;
