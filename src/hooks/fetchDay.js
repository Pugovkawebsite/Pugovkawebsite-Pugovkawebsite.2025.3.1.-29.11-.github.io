import {ref, onMounted} from 'vue';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function fetchDay() {
    const day = ref('')
    const fetchingDay = async () => {
        try {
            const customDayjs = dayjs().tz(dayjs.tz.guess());
            day.value = customDayjs.format('dddd, DD MMMM');
        } catch (e) {
            alert('Ошибка. Часовой пояс пользователя не определен');
        }
   }
   onMounted(fetchingDay)
    return {
      day
    }

};