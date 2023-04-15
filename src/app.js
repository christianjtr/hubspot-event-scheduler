import { PartnerService, EventScheduleService } from './services/index.js';
import { generateEventSchedulesPerCountry } from './jobs/eventSchedules.job.js';

const scheduleEvents = async () => {
    try {
        const partners = await PartnerService.getAllPartners();
        const eventSchedules = generateEventSchedulesPerCountry(partners);
        await EventScheduleService.sendOutEventSchedulesPerCountry(eventSchedules);
    } catch(error) {
        throw new Error(`An error has occurred when processing partners for scheduling events ${error}`);
    }
};

export {
    scheduleEvents,
};
