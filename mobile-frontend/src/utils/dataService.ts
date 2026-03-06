/**
 * dataService — export and import all app data as a single JSON backup.
 *
 * Each Zustand store persists its own AsyncStorage key. This service reads
 * all known keys into one object, writes it to a temp file, and shares it
 * via the iOS/Android share sheet. Import reverses the process.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

// Every key that the app persists data under.
const STORE_KEYS = [
    "todo-storage",
    "notes-blocks-storage",
    "recipe-storage",
    "timer-storage",
    "settings-storage",
    "stretch-storage",
    "activity-storage",
] as const;

const BACKUP_VERSION = 1;

export type BackupFile = {
    version: number;
    exportedAt: string;
    stores: Partial<Record<(typeof STORE_KEYS)[number], string>>;
};

/** Gather all store data and share as a .json file. */
export async function exportData(): Promise<void> {
    try {
        const stores: BackupFile["stores"] = {};
        for (const key of STORE_KEYS) {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) stores[key] = value;
        }

        const backup: BackupFile = {
            version: BACKUP_VERSION,
            exportedAt: new Date().toISOString(),
            stores,
        };

        const filename = `organization-station-backup-${Date.now()}.json`;
        const file = new File(Paths.cache, filename);
        file.write(JSON.stringify(backup, null, 2));

        const canShare = await Sharing.isAvailableAsync();
        if (!canShare) {
            Alert.alert("Sharing not available", "Cannot share files on this device.");
            return;
        }
        await Sharing.shareAsync(file.uri, {
            mimeType: "application/json",
            dialogTitle: "Save your OrganizationStation backup",
        });
    } catch (e) {
        Alert.alert("Export failed", String(e));
    }
}

/**
 * Restore data from a parsed backup object.
 * Writes every store key back to AsyncStorage, then alerts the user to
 * restart the app so Zustand re-hydrates from the new values.
 */
export async function importData(json: string): Promise<boolean> {
    try {
        const backup = JSON.parse(json) as BackupFile;
        if (!backup.stores || typeof backup.stores !== "object") {
            Alert.alert("Invalid backup", "This file doesn't look like a valid backup.");
            return false;
        }

        const pairs: [string, string][] = Object.entries(backup.stores)
            .filter(([, v]) => typeof v === "string") as [string, string][];

        await AsyncStorage.multiSet(pairs);
        return true;
    } catch (e) {
        Alert.alert("Import failed", String(e));
        return false;
    }
}

/** Wipe every store key from AsyncStorage. */
export async function clearAllData(): Promise<void> {
    await AsyncStorage.multiRemove([...STORE_KEYS]);
}
