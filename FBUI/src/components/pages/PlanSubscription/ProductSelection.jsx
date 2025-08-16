import FLowBloxQrCode from '@/components/common/util/QRCode';
import {
  Box,
  Checkbox,
  HStack,
  Input,
  QrCode,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';

const basePackages = [
  { label: 'Basic', value: 'basic', price: 10 },
  { label: 'Pro', value: 'pro', price: 20 },
];

const containerPackages = [
  { label: 'Small', value: 'small', price: 5 },
  { label: 'Medium', value: 'medium', price: 10 },
  { label: 'Large', value: 'large', price: 15 },
];

const boltOnPackages = [
  { label: 'Addon A', value: 'addon-a', price: 3 },
  { label: 'Addon B', value: 'addon-b', price: 4 },
];

const ProductSelection = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', contact: '' });
  const [base, setBase] = useState(null);
  const [containers, setContainers] = useState([]);
  const [boltOns, setBoltOns] = useState([]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleContainerChange = (pkg) => {
    setContainers((prev) => {
      const exists = prev.find((p) => p.value === pkg.value);
      if (exists) {
        return prev.filter((p) => p.value !== pkg.value);
      }
      if (prev.length < 5) {
        return [...prev, pkg];
      }
      return prev;
    });
  };

  const handleBoltOnChange = (pkg) => {
    setBoltOns((prev) => {
      const exists = prev.find((p) => p.value === pkg.value);
      return exists ? prev.filter((p) => p.value !== pkg.value) : [...prev, pkg];
    });
  };

  const total =
    (base?.price || 0) +
    containers.reduce((sum, item) => sum + item.price, 0) +
    boltOns.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <HStack spacing={10} align="start" p={10}>
        {/* Left Part */}
        <VStack align="stretch" w="50%" spacing={6}>
          <Text fontSize="xl" fontWeight="bold">User Info</Text>
          <Input placeholder="Name" variant={"fbloxD"} name="name" value={userInfo.name} onChange={handleInfoChange} />
          <Input placeholder="Email" variant={"fbloxD"} name="email" value={userInfo.email} onChange={handleInfoChange} />
          <Input placeholder="Contact Number" variant={"fbloxD"} name="contact" value={userInfo.contact} onChange={handleInfoChange} />

          <Box>
            <Text fontWeight="semibold">Select Base Package (Required)</Text>
            {basePackages.map((pkg) => (
              <Checkbox.Root
                key={pkg.value}
                checked={base?.value === pkg.value}
                onCheckedChange={() => setBase(pkg)}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <HiOutlinePlus />
                </Checkbox.Control>
                <Checkbox.Label>{pkg.label} - ${pkg.price}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Box>

          <Box>
            <Text fontWeight="semibold">Select Container Packages (Min 1, Max 5)</Text>
            {containerPackages.map((pkg) => (
              <Checkbox.Root
                key={pkg.value}
                checked={!!containers.find((c) => c.value === pkg.value)}
                onCheckedChange={() => handleContainerChange(pkg)}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <HiOutlinePlus />
                </Checkbox.Control>
                <Checkbox.Label>{pkg.label} - ${pkg.price}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Box>

          <Box>
            <Text fontWeight="semibold">Select Bolt-On Packages (Optional)</Text>
            {boltOnPackages.map((pkg) => (
              <Checkbox.Root
                key={pkg.value}
                checked={!!boltOns.find((b) => b.value === pkg.value)}
                onCheckedChange={() => handleBoltOnChange(pkg)}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control>
                  <HiOutlinePlus />
                </Checkbox.Control>
                <Checkbox.Label>{pkg.label} - ${pkg.price}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Box>
        </VStack>

        {/* Right Part */}
        <Box w="50%" p={5} borderWidth="1px" borderRadius="md" boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" mb={4}>Summary</Text>
          <VStack align="start" spacing={2}>
            <Text><strong>Name:</strong> {userInfo.name}</Text>
            <Text><strong>Email:</strong> {userInfo.email}</Text>
            <Text><strong>Contact:</strong> {userInfo.contact}</Text>
            {base && <Text><strong>Base:</strong> {base.label} (${base.price})</Text>}
            {containers.length > 0 && <Text><strong>Containers:</strong> {containers.map(c => c.label).join(', ')}</Text>}
            {boltOns.length > 0 && <Text><strong>Bolt-Ons:</strong> {boltOns.map(b => b.label).join(', ')}</Text>}
            <Text fontWeight="bold" pt={2}>Total: ${total}</Text>
          </VStack>
        </Box>
      </HStack>

      {/* <FLowBloxQrCode /> */}
      
      </>
  );
};

export default ProductSelection;