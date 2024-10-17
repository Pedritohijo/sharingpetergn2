import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Upload, Calendar, Lock } from 'lucide-react';

const schema = z.object({
  files: z.any().refine((files) => files?.length > 0, "At least one file is required"),
  recipientEmail: z.string().email("Invalid email address"),
  expirationDate: z.date().min(new Date(), "Expiration date must be in the future"),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
});

type FormData = z.infer<typeof schema>;

const UploadPage: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsUploading(true);
    // TODO: Implement actual file upload logic here
    console.log('Form data:', data);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating upload delay
    setIsUploading(false);
    setUploadSuccess(true);
  };

  if (uploadSuccess) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Upload Successful!</h2>
        <p className="mb-4">Your files have been uploaded and a download link has been sent to the recipient's email.</p>
        <button
          onClick={() => setUploadSuccess(false)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Upload More Files
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Upload Files</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-2">
            Select Files
          </label>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="files" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">Any file type (Max. 100MB)</p>
              </div>
              <input id="files" type="file" multiple className="hidden" {...register('files')} />
            </label>
          </div>
          {errors.files && <p className="mt-2 text-sm text-red-600">{errors.files.message}</p>}
        </div>

        <div>
          <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Recipient's Email
          </label>
          <input
            type="email"
            id="recipientEmail"
            {...register('recipientEmail')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.recipientEmail && <p className="mt-2 text-sm text-red-600">{errors.recipientEmail.message}</p>}
        </div>

        <div>
          <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-2">
            Expiration Date
          </label>
          <Controller
            control={control}
            name="expirationDate"
            render={({ field }) => (
              <div className="relative">
                <DatePicker
                  selected={field.value}
                  onChange={(date: Date) => field.onChange(date)}
                  minDate={new Date()}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <Calendar className="absolute right-3 top-3 text-gray-400" />
              </div>
            )}
          />
          {errors.expirationDate && <p className="mt-2 text-sm text-red-600">{errors.expirationDate.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password (Optional)
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              {...register('password')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <Lock className="absolute right-3 top-3 text-gray-400" />
          </div>
          {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Files'}
        </button>
      </form>
    </div>
  );
};

export default UploadPage;