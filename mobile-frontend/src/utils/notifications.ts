import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function requestNotificationPermission(): Promise<boolean> {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
}

export async function scheduleReminder(
    identifier: string,
    title: string,
    body: string,
    hour: number
): Promise<void> {
    // Cancel existing notification with this id first
    await Notifications.cancelScheduledNotificationAsync(identifier).catch(() => {});

    await Notifications.scheduleNotificationAsync({
        identifier,
        content: { title, body },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour,
            minute: 0,
        },
    });
}

export async function cancelReminder(identifier: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(identifier).catch(() => {});
}

export const STRETCH_REMINDER_ID = "stretch_daily_reminder";
export const TODO_REMINDER_ID = "todo_daily_reminder";
