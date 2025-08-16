import {
    Box,
    Button,
    Input,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import CustomSegmentGroup from "./CustomSegmentGroup";
import CustomSelect from "./CustomSelect";

export default function CustomCronGenerator() {
    const defaultCron = {
        min: '*',
        hour: '*',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*',
    };

    const getCronString = (cronX) => { return `${cronX.min} ${cronX.hour} ${cronX.dayOfMonth} ${cronX.month} ${cronX.dayOfWeek}`; }

    const defaultCronStr = getCronString(defaultCron);

    const [cron, setCron] = useState({ ...defaultCron });
    const [cronString, setCronString] = useState(defaultCronStr);
    const [readable, setReadable] = useState('Every minute');

    const [showMin, setShowMin] = useState(false);
    const [showHour, setShowHour] = useState(false);
    const [showDayOfMonth, setShowDayOfMonth] = useState(false);
    const [showMonth, setShowMonth] = useState(false);
    const [showDayOfWeek, setShowDayOfWeek] = useState(false);

    // State for selected values
    const [minSelected, setMinSelected] = useState(defaultCron.min);
    const [hourSelected, setHourSelected] = useState(defaultCron.hour);
    const [dayOfMonthSelected, setDayOfMonthSelected] = useState(defaultCron.dayOfMonth);
    const [monthSelected, setMonthSelected] = useState(defaultCron.month);
    const [dayOfWeekSelected, setDayOfWeekSelected] = useState(defaultCron.dayOfWeek);

    const onChangeOfTabs = (type) => {
        console.log("hiii....", type);
        const newCron = { ...defaultCron }; // Reset to defaultCron for all tabs

        // Reset selected values
        setMinSelected(defaultCron.min);
        setHourSelected(defaultCron.hour);
        setDayOfMonthSelected(defaultCron.dayOfMonth);
        setMonthSelected(defaultCron.month);
        setDayOfWeekSelected(defaultCron.dayOfWeek);

        if (type === "minute") {
            setShowMin(true);
            setShowHour(false);
            setShowDayOfMonth(false);
            setShowMonth(false);
            setShowDayOfWeek(false);
        } else if (type === "hourly") {
            setShowMin(true);
            setShowHour(true);
            setShowDayOfMonth(false);
            setShowMonth(false);
            setShowDayOfWeek(false);
        } else if (type === "daily") {
            setShowMin(true);
            setShowHour(true);
            setShowDayOfMonth(false);
            setShowMonth(false);
            setShowDayOfWeek(false);
        } else if (type === "weekly") {
            setShowMin(true);
            setShowHour(true);
            setShowDayOfMonth(false);
            setShowMonth(false);
            setShowDayOfWeek(true);
        } else if (type === "monthly") {
            setShowMin(true);
            setShowHour(true);
            setShowDayOfMonth(true);
            setShowMonth(true);
            setShowDayOfWeek(false);
        }

        console.log(newCron);
        setCron(newCron);
        setCronString(getCronString(newCron));
        updateCronEx(newCron); // Ensure readable text updates
    };

    const updateCron = () => {
        updateCronEx(cron);
    };

    const updateCronEx = (cronX) => {
        const newCron = getCronString(cronX);
        setCronString(newCron);
        let readableText = '';

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        if (cronX.min === '*' && cronX.hour === '*' && cronX.dayOfMonth === '*' && cronX.month === '*' && cronX.dayOfWeek === '*') {
            readableText = 'Every minute';
        } else if (cronX.min !== '*' && cronX.hour === '*' && cronX.dayOfMonth === '*' && cronX.month === '*' && cronX.dayOfWeek === '*') {
            readableText = `every hour at ${String(cronX.min).padStart(2, '0')} minutes`;
        } else {
            // Handle time
            if (cronX.hour !== '*' || cronX.min !== '*') {
                const hour = cronX.hour === '*' ? '0' : String(cronX.hour).padStart(2, '0');
                const minute = cronX.min === '*' ? '0' : String(cronX.min).padStart(2, '0');
                const period = parseInt(hour) >= 12 ? 'pm' : 'am';
                const displayHour = parseInt(hour) % 12 || 12;
                readableText += `at ${displayHour}:${minute}${period} `;
            }

            // Handle frequency
            if (cronX.dayOfWeek !== '*' && Number.isInteger(Number(cronX.dayOfWeek)) && cronX.dayOfWeek >= 0 && cronX.dayOfWeek <= 6) {
                readableText = `every ${dayNames[cronX.dayOfWeek]} ${readableText}`;
            } else if (cronX.dayOfMonth === '$') {
                readableText = `every last day of each month ${readableText}`;
            } else if (cronX.dayOfMonth !== '*' || cronX.month !== '*') {
                const monthText = cronX.month !== '*' && Number.isInteger(Number(cronX.month)) && cronX.month >= 1 && cronX.month <= 12
                    ? monthNames[cronX.month - 1]
                    : 'each month';
                readableText = `every ${cronX.dayOfMonth !== '*' ? `day ${cronX.dayOfMonth}` : 'day'} of ${monthText} ${readableText}`;
            } else {
                readableText = `every day ${readableText}`;
            }
        }

        setReadable(readableText.trim() || 'Every minute');
    };

    // Collections for each cron field with flat lists
    const minOptions = [
        { label: "Every minute", value: "*" },
        ...Array.from({ length: 60 }, (_, i) => ({
            label: `${i} minutes`,
            value: i.toString(),
        })),
    ];

    const hourOptions = [
        { label: "Every hour", value: "*" },
        ...Array.from({ length: 24 }, (_, i) => ({
            label: `${i}:00`,
            value: i.toString(),
        })),
    ];

    const dayOfMonthOptions = [
        { label: "Every day", value: "*" },
        { label: "Last day", value: "$" },
        ...Array.from({ length: 31 }, (_, i) => ({
            label: `Day ${i + 1}`,
            value: (i + 1).toString(),
        })),
    ];

    const monthOptions = [
        { label: "Every month", value: "*" },
        ...Array.from({ length: 12 }, (_, i) => ({
            label: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][i],
            value: (i + 1).toString(),
        })),
    ];

    const dayOfWeekOptions = [
        { label: "Every day", value: "*" },
        ...Array.from({ length: 7 }, (_, i) => ({
            label: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i],
            value: i.toString(),
        })),
    ];

    const handleSelectChange = (field) => (value) => {

        let newCron = { ...cron, [field]: value };
        setCron(newCron);
        updateCronEx(newCron);


    };

    const cronOptions = [      
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
    ];

    return (
        <Box p={5} maxW="500px" mx="auto" bg="gray.700" color="white" borderRadius="md" mt={5}>
            <Text fontSize="xl" mb={4}>Cron Generator for pg_cron</Text>
            <CustomSegmentGroup
                filterOptions={cronOptions}
                onChangeFilterOptions={(val) => {
                    console.log(val);
                    onChangeOfTabs(val);
                }}
                defaultValue={"monthly"}
            />
            <VStack spacing={3}>
                {showMin && (
                    <CustomSelect
                        sdata={minOptions}
                        slabel="Minute (0-59)"
                        splaceholder="Select minute"
                        selected={minSelected}
                        setSelected={setMinSelected}
                        cselectCallback={handleSelectChange('min')}
                        cwidth="320px"
                    />
                )}

                {showHour && (
                    <CustomSelect
                        sdata={hourOptions}
                        slabel="Hour (0-23)"
                        splaceholder="Select hour"
                        selected={hourSelected}
                        setSelected={setHourSelected}
                        cselectCallback={handleSelectChange('hour')}
                        cwidth="320px"
                    />
                )}

                {showDayOfMonth && (
                    <CustomSelect
                        sdata={dayOfMonthOptions}
                        slabel="Day of Month (1-31 or $)"
                        splaceholder="Select day"
                        selected={dayOfMonthSelected}
                        setSelected={setDayOfMonthSelected}
                        cselectCallback={handleSelectChange('dayOfMonth')}
                        cwidth="320px"
                    />
                )}

                {showMonth && (
                    <CustomSelect
                        sdata={monthOptions}
                        slabel="Month"
                        splaceholder="Select month"
                        selected={monthSelected}
                        setSelected={setMonthSelected}
                        cselectCallback={handleSelectChange('month')}
                        cwidth="320px"
                    />
                )}

                {showDayOfWeek && (
                    <CustomSelect
                        sdata={dayOfWeekOptions}
                        slabel="Day of Week"
                        splaceholder="Select day"
                        selected={dayOfWeekSelected}
                        setSelected={setDayOfWeekSelected}
                        cselectCallback={handleSelectChange('dayOfWeek')}
                        cwidth="320px"
                    />
                )}
                <Input
                    value={cronString}
                    readOnly
                    placeholder="Cron Expression"
                    bg="gray.600"
                    color="white"
                />
                <Text>{readable}</Text>
                <Button
                    onClick={() => alert(`Use this cron: ${cronString} in pg_cron.schedule()`)}
                    colorScheme="teal"
                    mt={2}
                >
                    Copy to pg_cron
                </Button>
            </VStack>
        </Box>
    );
}