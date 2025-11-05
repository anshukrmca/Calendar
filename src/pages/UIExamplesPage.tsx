import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Code, Eye } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Chip from '../components/ui/Chip';
import ColorPicker from '../components/ui/ColorPicker';
import Modal from '../components/ui/Modal';
import OffCanvas from '../components/ui/OffCanvas';

const UIExamplesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState('medium');
  const [selectedColor, setSelectedColor] = useState('bg-blue-200');
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const buttonVariants = ['primary', 'secondary', 'danger', 'outline'] as const;
  const buttonSizes = ['sm', 'md', 'lg'] as const;

  const colorOptions = [
    { value: 'bg-blue-200', label: 'Blue' },
    { value: 'bg-green-200', label: 'Green' },
    { value: 'bg-pink-200', label: 'Pink' },
    { value: 'bg-yellow-200', label: 'Yellow' },
    { value: 'bg-gray-200', label: 'Gray' },
  ];

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const chipOptions = ['low', 'medium', 'high'];

  const footer = (
    <div className="flex justify-end gap-2 w-full">
      <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
        Confirm
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div className="flex items-center mb-6">
            <Palette className="mr-3 text-blue-500" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">UI Components Library</h1>
              <p className="text-gray-600 mt-1">A showcase of reusable UI components with examples and usage</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Buttons Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center mb-4">
              <Eye className="mr-2 text-green-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Buttons</h2>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Versatile button component with multiple variants and sizes. Supports all standard button props.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  {buttonVariants.map((variant) => (
                    <Button key={variant} variant={variant} size="sm">
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Sizes</h3>
                <div className="flex items-center gap-2">
                  {buttonSizes.map((size) => (
                    <Button key={size} variant="primary" size={size}>
                      Size {size.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">With Icons</h3>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
                    <Palette size={16} className="mr-2" />
                    Open Modal
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setIsOffCanvasOpen(true)}>
                    <Eye size={16} className="mr-2" />
                    Open OffCanvas
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Inputs Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center mb-4">
              <Code className="mr-2 text-purple-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Form Inputs</h2>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Input components with labels, icons, and responsive design. Includes text inputs, textareas, and selects.
            </p>

            <div className="space-y-4">
              <Input
                label="Text Input"
                type="text"
                placeholder="Enter some text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <Textarea
                label="Textarea"
                placeholder="Enter longer text..."
                rows={3}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />

              <Select
                label="Select Dropdown"
                options={selectOptions}
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Chips Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center mb-4">
              <Eye className="mr-2 text-orange-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Chips</h2>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Interactive chip components for selections. Supports selected state and custom styling.
            </p>

            <div>
              <h3 className="font-medium mb-2">Importance Levels</h3>
              <div className="flex flex-wrap gap-2">
                {chipOptions.map((option) => (
                  <Chip
                    key={option}
                    label={option.charAt(0).toUpperCase() + option.slice(1)}
                    selected={selectedChip === option}
                    onClick={() => setSelectedChip(option)}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Color Picker Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center mb-4">
              <Palette className="mr-2 text-pink-500" size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Color Picker</h2>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Color selection component with visual color swatches. Perfect for theme customization.
            </p>

            <ColorPicker
              label="Choose a Color"
              value={selectedColor}
              onChange={setSelectedColor}
              options={colorOptions}
            />

            <div className="mt-4">
              <p className="text-sm text-gray-600">Selected: <span className="font-medium">{selectedColor}</span></p>
              <div className={`w-full h-8 ${selectedColor} rounded mt-2 border`}></div>
            </div>
          </motion.div>
        </div>

        {/* Modal Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 mt-6"
        >
          <div className="flex items-center mb-4">
            <Eye className="mr-2 text-indigo-500" size={20} />
            <h2 className="text-xl font-semibold text-gray-900">Modal</h2>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Flexible modal component with header, content, and footer sections. Supports custom content and actions.
          </p>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Click the button above to see the modal in action!</p>
            <p className="text-xs text-gray-500">
              The modal includes a close button in the header and supports custom footer content with action buttons.
            </p>
          </div>
        </motion.div>

        {/* OffCanvas Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow-md p-6 mt-6"
        >
          <div className="flex items-center mb-4">
            <Code className="mr-2 text-teal-500" size={20} />
            <h2 className="text-xl font-semibold text-gray-900">OffCanvas</h2>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            Slide-out panel component that appears from the left or right side. Perfect for navigation menus or additional content.
          </p>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Click the button above to see the OffCanvas in action!</p>
            <p className="text-xs text-gray-500">
              The OffCanvas slides in smoothly and includes a close button. It supports different sizes and positions.
            </p>
          </div>
        </motion.div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-md p-6 mt-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-medium mb-2">Button Usage</h3>
              <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>`}
              </pre>
            </div>

            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-medium mb-2">Input Usage</h3>
              <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`}
              </pre>
            </div>

            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-medium mb-2">Modal Usage</h3>
              <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="My Modal"
  footer={<Button>Close</Button>}
>
  Modal content here
</Modal>`}
              </pre>
            </div>

            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-medium mb-2">Chip Usage</h3>
              <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`<Chip
  label="Selected"
  selected={isSelected}
  onClick={() => setIsSelected(!isSelected)}
/>`}
              </pre>
            </div>

            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-medium mb-2">OffCanvas Usage</h3>
              <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`<OffCanvas
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="My Panel"
  position="right"
  size="md"
>
  Panel content here
</OffCanvas>`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        footer={footer}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            This is an example of the Modal component. It includes a header with title and close button,
            scrollable content area, and a footer with action buttons.
          </p>
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm text-blue-800">
              The modal automatically handles click-outside-to-close and escape key functionality.
            </p>
          </div>
        </div>
      </Modal>

      <OffCanvas
        isOpen={isOffCanvasOpen}
        onClose={() => setIsOffCanvasOpen(false)}
        title="Example OffCanvas"
        position="right"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            This is an example of the OffCanvas component. It slides in from the side and provides
            additional space for content or navigation.
          </p>
          <div className="bg-teal-50 p-4 rounded">
            <p className="text-sm text-teal-800">
              The OffCanvas supports different positions (left/right) and sizes (sm/md/lg/xl).
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Quick Actions</h4>
            <Button variant="primary" size="sm" className="w-full">
              Action 1
            </Button>
            <Button variant="secondary" size="sm" className="w-full">
              Action 2
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              Action 3
            </Button>
          </div>
        </div>
      </OffCanvas>
    </div>
  );
};

export default UIExamplesPage;
