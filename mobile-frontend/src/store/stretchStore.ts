import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// ─── Body parts ──────────────────────────────────────────────────────────────

export type BodyPart =
    | "neck"
    | "shoulders"
    | "chest"
    | "back"
    | "hip_flexors"
    | "hamstrings"
    | "quads"
    | "glutes"
    | "calves"
    | "it_band";

export const BODY_PART_LABELS: Record<BodyPart, string> = {
    neck: "Neck",
    shoulders: "Shoulders",
    chest: "Chest",
    back: "Back",
    hip_flexors: "Hip Flexors",
    hamstrings: "Hamstrings",
    quads: "Quads",
    glutes: "Glutes",
    calves: "Calves",
    it_band: "IT Band",
};

export const BODY_PART_ORDER: BodyPart[] = [
    "neck",
    "shoulders",
    "chest",
    "back",
    "hip_flexors",
    "hamstrings",
    "quads",
    "glutes",
    "calves",
    "it_band",
];

// ─── Stretch library ─────────────────────────────────────────────────────────

export type Stretch = {
    id: string;
    name: string;
    bodyPart: BodyPart;
    defaultDuration: number; // seconds
    bilateral: boolean;      // true = has distinct left/right sides
};

export const STRETCHES: Stretch[] = [
    // Neck
    { id: "neck_side_tilt",       name: "Side Tilt",          bodyPart: "neck",       defaultDuration: 30, bilateral: true },
    { id: "neck_forward_tilt",    name: "Forward Tilt",       bodyPart: "neck",       defaultDuration: 30, bilateral: false },
    { id: "neck_rotation",        name: "Neck Rotation",      bodyPart: "neck",       defaultDuration: 30, bilateral: true },
    { id: "neck_ear_to_shoulder", name: "Ear to Shoulder",    bodyPart: "neck",       defaultDuration: 30, bilateral: true },

    // Shoulders
    { id: "shoulder_cross_body",      name: "Cross-Body Arm Pull",    bodyPart: "shoulders", defaultDuration: 30, bilateral: true },
    { id: "shoulder_doorway",         name: "Doorway Stretch",        bodyPart: "shoulders", defaultDuration: 45, bilateral: false },
    { id: "shoulder_overhead_tricep", name: "Overhead Tricep",        bodyPart: "shoulders", defaultDuration: 30, bilateral: true },
    { id: "shoulder_eagle_arms",      name: "Eagle Arms",             bodyPart: "shoulders", defaultDuration: 30, bilateral: true },
    { id: "shoulder_thread_needle",   name: "Thread the Needle",      bodyPart: "shoulders", defaultDuration: 30, bilateral: true },

    // Chest
    { id: "chest_doorway",        name: "Doorway Chest Opener",       bodyPart: "chest", defaultDuration: 45, bilateral: false },
    { id: "chest_clasped_hands",  name: "Clasped Hands Behind Back",  bodyPart: "chest", defaultDuration: 30, bilateral: false },
    { id: "chest_cobra",          name: "Cobra Pose",                 bodyPart: "chest", defaultDuration: 30, bilateral: false },
    { id: "chest_pec_corner",     name: "Corner Stretch",             bodyPart: "chest", defaultDuration: 30, bilateral: false },

    // Back
    { id: "back_cat_cow",        name: "Cat-Cow",                bodyPart: "back", defaultDuration: 30, bilateral: false },
    { id: "back_childs_pose",    name: "Child's Pose",           bodyPart: "back", defaultDuration: 45, bilateral: false },
    { id: "back_seated_twist",   name: "Seated Spinal Twist",    bodyPart: "back", defaultDuration: 30, bilateral: true },
    { id: "back_knee_to_chest",  name: "Knees to Chest",         bodyPart: "back", defaultDuration: 30, bilateral: false },
    { id: "back_thread_needle",  name: "Thread the Needle",      bodyPart: "back", defaultDuration: 30, bilateral: true },

    // Hip Flexors
    { id: "hip_kneeling_lunge", name: "Kneeling Lunge",         bodyPart: "hip_flexors", defaultDuration: 45, bilateral: true },
    { id: "hip_pigeon",         name: "Pigeon Pose",             bodyPart: "hip_flexors", defaultDuration: 60, bilateral: true },
    { id: "hip_low_lunge",      name: "Low Lunge (Crescent)",   bodyPart: "hip_flexors", defaultDuration: 45, bilateral: true },
    { id: "hip_butterfly",      name: "Butterfly",               bodyPart: "hip_flexors", defaultDuration: 45, bilateral: false },
    { id: "hip_90_90",          name: "90/90 Hip Stretch",      bodyPart: "hip_flexors", defaultDuration: 60, bilateral: true },

    // Hamstrings
    { id: "ham_standing_forward_fold", name: "Standing Forward Fold",    bodyPart: "hamstrings", defaultDuration: 45, bilateral: false },
    { id: "ham_seated_forward_fold",   name: "Seated Forward Fold",      bodyPart: "hamstrings", defaultDuration: 45, bilateral: false },
    { id: "ham_lying_leg_raise",       name: "Lying Leg Raise",          bodyPart: "hamstrings", defaultDuration: 30, bilateral: true },
    { id: "ham_doorway_hamstring",     name: "Doorway Hamstring Stretch", bodyPart: "hamstrings", defaultDuration: 45, bilateral: false },
    { id: "ham_supine_single_leg",     name: "Supine Single-Leg Pull",   bodyPart: "hamstrings", defaultDuration: 30, bilateral: true },

    // Quads
    { id: "quad_standing_pull",   name: "Standing Quad Pull",         bodyPart: "quads", defaultDuration: 30, bilateral: true },
    { id: "quad_prone_pull",      name: "Prone Quad Pull",            bodyPart: "quads", defaultDuration: 30, bilateral: true },
    { id: "quad_kneeling_lunge",  name: "Kneeling Lunge Quad Focus",  bodyPart: "quads", defaultDuration: 45, bilateral: true },
    { id: "quad_heros_pose",      name: "Hero's Pose",                bodyPart: "quads", defaultDuration: 45, bilateral: false },

    // Glutes
    { id: "glute_figure_four",    name: "Figure-Four (Piriformis)",  bodyPart: "glutes", defaultDuration: 45, bilateral: true },
    { id: "glute_seated_cross_leg", name: "Seated Cross-Leg Glute", bodyPart: "glutes", defaultDuration: 45, bilateral: true },
    { id: "glute_pigeon",         name: "Pigeon Pose (Glute focus)", bodyPart: "glutes", defaultDuration: 60, bilateral: true },
    { id: "glute_supine_twist",   name: "Supine Spinal Twist",      bodyPart: "glutes", defaultDuration: 30, bilateral: true },

    // Calves
    { id: "calf_wall_calf_raise", name: "Wall Calf Stretch",         bodyPart: "calves", defaultDuration: 30, bilateral: true },
    { id: "calf_downward_dog",    name: "Downward Dog Calf Pedal",   bodyPart: "calves", defaultDuration: 30, bilateral: false },
    { id: "calf_step_drop",       name: "Step Drop",                 bodyPart: "calves", defaultDuration: 30, bilateral: true },
    { id: "calf_seated_towel",    name: "Seated Towel Pull",         bodyPart: "calves", defaultDuration: 30, bilateral: true },

    // IT Band
    { id: "it_standing_cross",   name: "Standing Cross-Leg Lean",  bodyPart: "it_band", defaultDuration: 30, bilateral: true },
    { id: "it_foam_roller",      name: "Foam Roller (IT Band)",    bodyPart: "it_band", defaultDuration: 60, bilateral: true },
    { id: "it_lying_cross_over", name: "Lying Cross-Over Stretch", bodyPart: "it_band", defaultDuration: 30, bilateral: true },
    { id: "it_figure_four_side", name: "Figure-Four Side Bend",   bodyPart: "it_band", defaultDuration: 30, bilateral: true },
];

// ─── Routines ─────────────────────────────────────────────────────────────────

export type RoutineItem = {
    stretchId: string;
    duration: number; // seconds
};

export type Routine = {
    id: string;
    name: string;
    items: RoutineItem[];
};

// ─── Store ───────────────────────────────────────────────────────────────────

type StretchStore = {
    routines: Routine[];
    addRoutine: (routine: Routine) => void;
    updateRoutine: (routine: Routine) => void;
    deleteRoutine: (id: string) => void;
};

export const useStretchStore = create<StretchStore>()(
    persist(
        (set) => ({
            routines: [],
            addRoutine: (routine) =>
                set((s) => ({ routines: [...s.routines, routine] })),
            updateRoutine: (routine) =>
                set((s) => ({
                    routines: s.routines.map((r) => (r.id === routine.id ? routine : r)),
                })),
            deleteRoutine: (id) =>
                set((s) => ({ routines: s.routines.filter((r) => r.id !== id) })),
        }),
        {
            name: "stretch-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
