import STRETCH_IMAGES from "./stretchImages";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BendStretch = {
    name: string;
    imageStem: string; // key into STRETCH_IMAGES
    instructions: string[];
    tips: string[];
    modifications: string[];
    benefits: string[];
};

// ─── Bend stretch data keyed by name ─────────────────────────────────────────

const BEND_BY_NAME: Record<string, BendStretch> = {
    "90/90": {
        name: "90/90",
        imageStem: "r1_001_90-90",
        instructions: [
            "Start seated on the floor with your knees bent and feet flat.",
            "Let your knees fall to one side so both knees form 90-degree angles against the floor.",
            "Square your hips to face your front leg and place your hands on the floor for support.",
            "Hinge at your hips to gently lean forward over your front leg.",
        ],
        tips: ["Keep your back straight and avoid rounding your spine."],
        modifications: ["Sit on a cushion or folded blanket to raise your hips for less intensity."],
        benefits: ["Hips", "Glutes", "Groin", "Knees"],
    },
    "Baby Cobra": {
        name: "Baby Cobra",
        imageStem: "r1_013_baby_cobra",
        instructions: [
            "Lie face down with legs extended, tops of feet on the floor.",
            "Place your hands flat under your shoulders, fingers spread wide.",
            "Engage your core and press your pelvis into the floor.",
            "Inhale and slowly lift your head, chest, and upper abdomen using your back muscles.",
            "Keep elbows slightly bent and close to your body.",
        ],
        tips: [
            "Keep your neck neutral and gaze down or slightly forward.",
            "Engage your core to protect your lower back.",
        ],
        modifications: ["Keep the lift minimal if you have lower back issues."],
        benefits: ["Spine", "Chest", "Shoulders", "Abdomen"],
    },
    "Butterfly": {
        name: "Butterfly",
        imageStem: "r1_027_butterfly",
        instructions: [
            "Sit on the floor with your back straight.",
            "Bend your knees and bring the soles of your feet together in front of you.",
            "Hold your feet or ankles and let your knees drop toward the floor.",
            "Sit tall and gently press your knees down with your elbows if needed.",
        ],
        tips: [
            "Avoid rounding your lower back.",
            "The closer your feet are to your body, the more intense the stretch.",
        ],
        modifications: ["Sit on a folded blanket to elevate your hips for easier positioning."],
        benefits: ["Inner Thighs", "Groin", "Hips"],
    },
    "Cat Cow": {
        name: "Cat Cow",
        imageStem: "r1_032_cat_cow",
        instructions: [
            "Start on all fours with wrists under shoulders and knees under hips.",
            "Inhale (Cow): lift your head, tailbone, and chest toward the ceiling.",
            "Exhale (Cat): tuck your chin, tailbone, and draw your navel to your spine.",
            "Flow between both positions with your breath.",
        ],
        tips: ["Move slowly and synchronise each movement with your breath."],
        modifications: ["Place a folded blanket under your knees if kneeling is uncomfortable."],
        benefits: ["Spine", "Back", "Core", "Neck"],
    },
    "Chest Opener": {
        name: "Chest Opener",
        imageStem: "r1_034_chest_opener",
        instructions: [
            "Stand tall or sit on a chair.",
            "Interlace your fingers behind your back.",
            "Straighten your arms and squeeze your shoulder blades together.",
            "Lift your chest and hold.",
        ],
        tips: ["Look straight ahead or gently tilt your head back."],
        modifications: ["Hold a towel between your hands if your shoulders are tight."],
        benefits: ["Chest", "Shoulders", "Pectorals"],
    },
    "Child's Pose": {
        name: "Child's Pose",
        imageStem: "r1_036_childs_pose",
        instructions: [
            "Kneel on the floor with your big toes touching and knees hip-width apart.",
            "Sit back onto your heels.",
            "Extend your arms forward and lower your torso between your thighs.",
            "Rest your forehead on the floor and breathe deeply.",
        ],
        tips: [
            "Focus on lengthening your spine with each exhale.",
            "Walk your hands further forward for a deeper shoulder stretch.",
        ],
        modifications: ["Place a pillow between your thighs and calves if hips don't reach heels."],
        benefits: ["Back", "Hips", "Shoulders", "Chest"],
    },
    "Cobra": {
        name: "Cobra",
        imageStem: "r1_038_cobra",
        instructions: [
            "Lie face down with legs extended, tops of feet on the floor.",
            "Place your palms under your shoulders, elbows close to your body.",
            "Inhale and straighten your arms to lift your chest off the floor.",
            "Keep your hips on the floor and shoulders relaxed away from ears.",
        ],
        tips: ["Engage your glutes to protect your lower back."],
        modifications: ["Keep elbows bent for a lower, gentler backbend (Baby Cobra)."],
        benefits: ["Spine", "Chest", "Shoulders", "Abdomen"],
    },
    "Corner Pecs": {
        name: "Corner Pecs",
        imageStem: "r1_040_corner_pecs",
        instructions: [
            "Stand in a corner or doorway.",
            "Raise your arms to shoulder height, bend elbows 90°, and place forearms on the walls.",
            "Step one foot forward and gently lean your chest through.",
            "Hold and breathe deeply.",
        ],
        tips: ["Adjust arm height to target different parts of the chest."],
        modifications: ["Use a single wall if no corner is available."],
        benefits: ["Chest", "Shoulders", "Pectorals"],
    },
    "Cross Leg Fold": {
        name: "Cross Leg Fold",
        imageStem: "r1_043_cross_leg_fold",
        instructions: [
            "Sit cross-legged on the floor.",
            "Sit tall and hinge forward from the hips.",
            "Walk your hands forward and lower your torso toward the floor.",
            "Switch which leg is in front and repeat.",
        ],
        tips: ["Focus on keeping your back flat rather than reaching far."],
        modifications: ["Sit on a cushion to elevate your hips."],
        benefits: ["Hips", "Glutes", "Lower Back"],
    },
    "Doorway Pecs": {
        name: "Doorway Pecs",
        imageStem: "r1_055_doorway_pecs",
        instructions: [
            "Stand in a doorway and grip the sides at shoulder height.",
            "Step one foot forward and lean your body forward until you feel a stretch across your chest.",
            "Keep your arms at 90° angles and chest tall.",
        ],
        tips: ["Try different arm heights — higher targets upper pecs, lower targets lower pecs."],
        modifications: ["Perform against a wall if no doorway is available."],
        benefits: ["Chest", "Pectorals", "Shoulders"],
    },
    "Double Knee Spinal Twist": {
        name: "Double Knee Spinal Twist",
        imageStem: "r1_056_double_knee_spinal_twist",
        instructions: [
            "Lie on your back with arms extended out to the sides at shoulder height.",
            "Bring both knees to your chest.",
            "Let both knees fall to one side, keeping both shoulders on the floor.",
            "Turn your head in the opposite direction if comfortable.",
            "Switch sides after holding.",
        ],
        tips: ["Focus on keeping your shoulders grounded, not how far your knees drop."],
        modifications: ["Place a pillow under your knees if they don't reach the floor."],
        benefits: ["Spine", "Back", "Glutes", "Hips"],
    },
    "Downward Dog": {
        name: "Downward Dog",
        imageStem: "r1_059_downward_dog",
        instructions: [
            "Start on all fours with wrists under shoulders and knees under hips.",
            "Tuck your toes and lift your hips toward the ceiling, straightening arms and legs.",
            "Press through your palms and lengthen your spine.",
            "Pedal your heels alternately to deepen the calf stretch.",
        ],
        tips: [
            "Bend your knees slightly if your hamstrings are tight.",
            "Spread your fingers wide and press all four corners of each hand into the floor.",
        ],
        modifications: ["Bend your knees and focus on lengthening the spine first."],
        benefits: ["Hamstrings", "Calves", "Shoulders", "Back", "Spine"],
    },
    "Eagle Arm": {
        name: "Eagle Arm",
        imageStem: "r1_064_eagle_arm",
        instructions: [
            "Extend both arms forward at shoulder height.",
            "Cross your right arm under your left and bend both elbows.",
            "Wrap your forearms and try to press palms together (or as close as possible).",
            "Lift elbows to shoulder height and breathe.",
            "Switch sides.",
        ],
        tips: ["If palms don't touch, press the backs of your hands together."],
        modifications: ["Hold one elbow with the opposite hand for a simpler shoulder stretch."],
        benefits: ["Shoulders", "Upper Back", "Neck"],
    },
    "Ear-to-Shoulder": {
        name: "Ear-to-Shoulder",
        imageStem: "r1_065_ear-to-shoulder",
        instructions: [
            "Sit or stand tall with your spine long.",
            "Slowly tilt your head to bring your right ear toward your right shoulder.",
            "Place your right hand gently on the top of your head for a deeper stretch.",
            "Hold and switch sides.",
        ],
        tips: ["Keep your opposite shoulder down — don't let it rise to meet your ear."],
        modifications: ["Simply tilt without using your hand for a gentler stretch."],
        benefits: ["Neck", "Traps", "Scalenes"],
    },
    "Figure Four Twist": {
        name: "Figure Four Twist",
        imageStem: "r1_071_figure_four_twist",
        instructions: [
            "Lie on your back with knees bent and feet flat.",
            "Cross your right ankle over your left thigh in a figure-four position.",
            "Let both legs fall to the right.",
            "Extend your arms out to the sides and turn your head left.",
            "Switch sides.",
        ],
        tips: ["Keep both shoulders on the floor throughout."],
        modifications: ["Place a pillow under the lowered knees for support."],
        benefits: ["Glutes", "Hips", "Spine", "IT Band"],
    },
    "Forward Fold": {
        name: "Forward Fold",
        imageStem: "r1_075_forward_fold",
        instructions: [
            "Stand with feet hip-width apart.",
            "Inhale and lengthen your spine, then exhale and hinge forward at the hips.",
            "Let your torso hang over your legs, arms dangling or holding opposite elbows.",
            "Bend your knees generously if your hamstrings are tight.",
        ],
        tips: ["Prioritise a long spine over straight legs."],
        modifications: ["Hold onto your shins or place hands on blocks."],
        benefits: ["Hamstrings", "Calves", "Lower Back", "Spine"],
    },
    "Hamstring Pulls": {
        name: "Hamstring Pulls",
        imageStem: "r1_085_hamstring_pulls",
        instructions: [
            "Lie on your back with both legs extended.",
            "Raise one leg toward the ceiling and loop a strap or towel around the foot.",
            "Gently pull the leg toward you, keeping it as straight as possible.",
            "Hold and switch sides.",
        ],
        tips: ["Keep the opposite leg pressed to the floor."],
        modifications: ["Bend the raised knee if hamstrings are very tight."],
        benefits: ["Hamstrings", "Calves", "Lower Back"],
    },
    "Knees-to-chest": {
        name: "Knees-to-chest",
        imageStem: "r2_014_knees-to-chest",
        instructions: [
            "Lie on your back with legs extended.",
            "Draw both knees toward your chest, holding your shins or knees.",
            "Rock gently side to side to massage your lower back.",
        ],
        tips: ["Keep your lower back pressed into the floor as you pull your knees in."],
        modifications: ["Hug one knee at a time for a gentler stretch."],
        benefits: ["Lower Back", "Hips", "Glutes"],
    },
    "Kneeling Psoas": {
        name: "Kneeling Psoas",
        imageStem: "r2_009_kneeling_psoas",
        instructions: [
            "Kneel on one knee with the other foot forward, forming a 90° angle.",
            "Keep your torso upright and tuck your pelvis slightly under.",
            "Shift your weight forward until you feel a stretch in the front of the back hip.",
            "Hold and switch sides.",
        ],
        tips: ["Squeeze the glute of the back leg to deepen the hip flexor stretch."],
        modifications: ["Place a folded blanket under the back knee for padding."],
        benefits: ["Hip Flexors", "Psoas", "Quads"],
    },
    "Kneeling Quad": {
        name: "Kneeling Quad",
        imageStem: "r2_010_kneeling_quad",
        instructions: [
            "Kneel on one knee with the other foot forward.",
            "Reach back and hold the ankle of your kneeling leg.",
            "Pull your heel toward your glute while keeping your torso upright.",
            "Hold and switch sides.",
        ],
        tips: ["Keep your hips square and avoid twisting."],
        modifications: ["Hold onto a wall or chair for balance."],
        benefits: ["Quads", "Hip Flexors"],
    },
    "Leaning Calf": {
        name: "Leaning Calf",
        imageStem: "r2_019_leaning_calf",
        instructions: [
            "Stand facing a wall and place both hands on it at shoulder height.",
            "Step one foot back and press the heel firmly into the floor.",
            "Lean into the wall until you feel a stretch in the calf of the back leg.",
            "Hold and switch sides.",
        ],
        tips: ["Keep your back heel fully on the floor."],
        modifications: ["Step the back foot closer to the wall for less intensity."],
        benefits: ["Calves", "Gastrocnemius"],
    },
    "Lunge": {
        name: "Lunge",
        imageStem: "r2_027_lunge",
        instructions: [
            "Step one foot forward into a lunge, front knee directly over ankle.",
            "Lower your back knee toward the floor.",
            "Keep your torso upright and core engaged.",
            "Hold and switch sides.",
        ],
        tips: ["Don't let your front knee pass your toes."],
        modifications: ["Lower to a kneeling lunge for more stability."],
        benefits: ["Hip Flexors", "Quads", "Glutes", "Hamstrings"],
    },
    "Lying Hamstring": {
        name: "Lying Hamstring",
        imageStem: "r2_030_lying_hamstring",
        instructions: [
            "Lie on your back with both legs extended.",
            "Lift one leg and hold the back of your thigh.",
            "Straighten it toward the ceiling as much as possible.",
            "Keep the other leg flat on the floor.",
            "Hold and switch sides.",
        ],
        tips: ["Flex your foot to intensify the stretch."],
        modifications: ["Bend the raised knee if your hamstrings are tight."],
        benefits: ["Hamstrings", "Calves"],
    },
    "Lying Quad Stretch": {
        name: "Lying Quad Stretch",
        imageStem: "r2_032_lying_quad_stretch",
        instructions: [
            "Lie on your side with your legs stacked.",
            "Bend your top knee and hold your ankle, drawing the heel toward your glute.",
            "Keep your hips stacked and avoid arching your lower back.",
            "Hold and switch sides.",
        ],
        tips: ["Engage your core to prevent your back from arching."],
        modifications: ["Use a towel or strap around your ankle if you can't reach it."],
        benefits: ["Quads", "Hip Flexors"],
    },
    "Modified Seated Twist": {
        name: "Modified Seated Twist",
        imageStem: "r2_035_modified_seated_twist",
        instructions: [
            "Sit on the floor with legs extended.",
            "Cross one foot over the other leg and place it flat on the floor.",
            "Sit tall and twist your torso toward the bent knee.",
            "Use the opposite elbow to hug the knee for leverage.",
            "Hold and switch sides.",
        ],
        tips: ["Lengthen your spine on each inhale and deepen the twist on each exhale."],
        modifications: ["Keep both legs straight for a gentler spinal twist."],
        benefits: ["Spine", "Back", "Glutes", "Hips"],
    },
    "Neck Flexion": {
        name: "Neck Flexion",
        imageStem: "r2_041_neck_flexion",
        instructions: [
            "Sit or stand tall with your spine long.",
            "Slowly tilt your chin down toward your chest.",
            "You can place your hands gently on the back of your head for a deeper stretch.",
            "Hold and breathe.",
        ],
        tips: ["Don't press hard on your head — use gentle guidance only."],
        modifications: ["Simply nod without using hands for a gentler option."],
        benefits: ["Neck", "Upper Back"],
    },
    "Neck Rotation": {
        name: "Neck Rotation",
        imageStem: "r2_045_neck_rotation",
        instructions: [
            "Sit or stand tall.",
            "Slowly turn your head to look over your right shoulder.",
            "Hold, then rotate to the left.",
            "Keep your shoulders down and relaxed.",
        ],
        tips: ["Move slowly and stop at any point of discomfort."],
        modifications: ["Reduce range of motion if you experience any pain."],
        benefits: ["Neck", "Cervical Spine"],
    },
    "Overhead Tricep": {
        name: "Overhead Tricep",
        imageStem: "r2_049_overhead_tricep",
        instructions: [
            "Stand or sit tall.",
            "Raise one arm overhead and bend the elbow, reaching your hand toward the opposite shoulder blade.",
            "Use your other hand to gently push the elbow further back.",
            "Hold and switch sides.",
        ],
        tips: ["Keep your ribs down and avoid arching your lower back."],
        modifications: ["Hold a towel in the raised hand if you can't reach your back."],
        benefits: ["Triceps", "Shoulders"],
    },
    "Pigeon": {
        name: "Pigeon",
        imageStem: "r2_054_pigeon",
        instructions: [
            "From all fours, bring your right knee forward toward your right wrist.",
            "Angle your right shin diagonally and lower your hips.",
            "Extend your left leg straight back.",
            "Hinge forward over your front leg, resting on your forearms or forehead.",
            "Hold and switch sides.",
        ],
        tips: ["Square your hips toward the floor as much as possible."],
        modifications: ["Place a folded blanket under the hip of the front leg for support."],
        benefits: ["Hips", "Glutes", "Hip Flexors", "Piriformis"],
    },
    "Seated Figure Four": {
        name: "Seated Figure Four",
        imageStem: "r2_079_seated_figure_four",
        instructions: [
            "Sit on the floor with your back straight and feet flat.",
            "Cross your right ankle over your left knee.",
            "Flex your right foot and hinge forward from the hips.",
            "Hold and switch sides.",
        ],
        tips: ["Flex the foot of the crossed leg to protect your knee."],
        modifications: ["Sit on a chair with the same cross-leg position for an easier option."],
        benefits: ["Glutes", "Piriformis", "Hips"],
    },
    "Seated Hamstring": {
        name: "Seated Hamstring",
        imageStem: "r2_081_seated_hamstring",
        instructions: [
            "Sit on the floor with one leg extended and the other bent, foot toward your inner thigh.",
            "Sit tall and hinge forward at your hips over the extended leg.",
            "Reach toward your foot with both hands.",
            "Hold and switch sides.",
        ],
        tips: ["Keep your back straight — don't round your spine to reach further."],
        modifications: ["Loop a towel around your foot if you can't reach it."],
        benefits: ["Hamstrings", "Lower Back", "Calves"],
    },
    "Seated Twist": {
        name: "Seated Twist",
        imageStem: "r2_084_seated_twist",
        instructions: [
            "Sit on the floor with both legs extended.",
            "Bend one knee and cross that foot over the other leg, placing it flat on the floor.",
            "Sit tall and twist toward the bent knee, placing the opposite elbow on the outside of that knee.",
            "Hold and switch sides.",
        ],
        tips: ["Keep your spine long on every inhale; deepen the twist on every exhale."],
        modifications: ["Twist with both legs straight for a gentler version."],
        benefits: ["Spine", "Back", "Hips", "Glutes"],
    },
    "Shoulder Cross": {
        name: "Shoulder Cross",
        imageStem: "r2_085_shoulder_cross",
        instructions: [
            "Stand tall and bring one arm across your chest.",
            "Use your opposite hand or forearm to press the arm closer to your body.",
            "Keep your shoulder relaxed — don't let it rise.",
            "Hold and switch sides.",
        ],
        tips: ["Keep the stretching arm straight for a more intense posterior shoulder stretch."],
        modifications: ["Bend the stretching arm slightly if you feel discomfort."],
        benefits: ["Shoulders", "Posterior Deltoid", "Upper Back"],
    },
    "Single Leg Calf Stretch": {
        name: "Single Leg Calf Stretch",
        imageStem: "r2_097_single_leg_calf_stretch",
        instructions: [
            "Stand facing a wall, hands placed on it at shoulder height.",
            "Step one foot back and press the heel firmly into the floor.",
            "Keep the back knee straight to target the gastrocnemius.",
            "Hold and switch sides.",
        ],
        tips: ["Bend the back knee slightly to shift the stretch to the soleus (deeper calf muscle)."],
        modifications: ["Step less far back for a gentler stretch."],
        benefits: ["Calves", "Gastrocnemius", "Achilles"],
    },
    "Spinal Twist": {
        name: "Spinal Twist",
        imageStem: "r3_006_spinal_twist",
        instructions: [
            "Lie on your back with arms extended out to the sides.",
            "Draw one knee to your chest, then cross it over your body.",
            "Keep your shoulders on the floor and relax.",
            "Hold and switch sides.",
        ],
        tips: ["Breathe deeply and let gravity do the work."],
        modifications: ["Place a pillow under the crossed knee if it doesn't reach the floor."],
        benefits: ["Spine", "Back", "Glutes", "IT Band", "Hips"],
    },
    "Standing Quad": {
        name: "Standing Quad",
        imageStem: "r3_015_standing_quad",
        instructions: [
            "Stand on one foot, bending the other knee behind you.",
            "Hold your ankle or foot and draw your heel toward your glute.",
            "Keep your knees together and torso upright.",
            "Hold and switch sides.",
        ],
        tips: ["Hold a wall or chair for balance if needed."],
        modifications: ["Hold a chair for balance support."],
        benefits: ["Quads", "Hip Flexors"],
    },
    "Thread the Needle": {
        name: "Thread the Needle",
        imageStem: "r3_019_thread_the_needle",
        instructions: [
            "Start on all fours with wrists under shoulders and knees under hips.",
            "Slide one arm under your body, threading it along the floor.",
            "Lower your shoulder and cheek to the floor.",
            "Hold and switch sides.",
        ],
        tips: ["Keep your hips raised and square throughout the movement."],
        modifications: ["Reduce how far you thread the arm for less intensity."],
        benefits: ["Shoulders", "Upper Back", "Thoracic Spine"],
    },
    "Towel Calf Stretch": {
        name: "Towel Calf Stretch",
        imageStem: "r3_028_towel_calf_stretch",
        instructions: [
            "Sit on the floor with one leg extended.",
            "Loop a towel around the ball of your foot.",
            "Gently pull the towel toward you, flexing your foot.",
            "Hold and switch sides.",
        ],
        tips: ["Keep your leg as straight as possible."],
        modifications: ["Use a resistance band instead of a towel."],
        benefits: ["Calves", "Achilles", "Plantar Fascia"],
    },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getBendData(bendName: string): BendStretch | null {
    return BEND_BY_NAME[bendName] ?? null;
}

export function getBendImage(bendName: string): ReturnType<typeof require> | null {
    const entry = BEND_BY_NAME[bendName];
    if (!entry) return null;
    return STRETCH_IMAGES[entry.imageStem] ?? null;
}

// ─── Mapping: existing stretch store IDs → bend data name ────────────────────

export const STRETCH_ID_TO_BEND_NAME: Record<string, string> = {
    // Neck
    neck_side_tilt:       "Ear-to-Shoulder",
    neck_forward_tilt:    "Neck Flexion",
    neck_rotation:        "Neck Rotation",
    neck_ear_to_shoulder: "Ear-to-Shoulder",

    // Shoulders
    shoulder_cross_body:      "Shoulder Cross",
    shoulder_doorway:         "Doorway Pecs",
    shoulder_overhead_tricep: "Overhead Tricep",
    shoulder_eagle_arms:      "Eagle Arm",
    shoulder_thread_needle:   "Thread the Needle",

    // Chest
    chest_doorway:       "Doorway Pecs",
    chest_clasped_hands: "Chest Opener",
    chest_cobra:         "Cobra",
    chest_pec_corner:    "Corner Pecs",

    // Back
    back_cat_cow:       "Cat Cow",
    back_childs_pose:   "Child's Pose",
    back_seated_twist:  "Seated Twist",
    back_knee_to_chest: "Knees-to-chest",
    back_thread_needle: "Thread the Needle",

    // Hip Flexors
    hip_kneeling_lunge: "Kneeling Psoas",
    hip_pigeon:         "Pigeon",
    hip_low_lunge:      "Lunge",
    hip_butterfly:      "Butterfly",
    hip_90_90:          "90/90",

    // Hamstrings
    ham_standing_forward_fold: "Forward Fold",
    ham_seated_forward_fold:   "Seated Hamstring",
    ham_lying_leg_raise:       "Lying Hamstring",
    ham_supine_single_leg:     "Hamstring Pulls",

    // Quads
    quad_standing_pull:  "Standing Quad",
    quad_prone_pull:     "Lying Quad Stretch",
    quad_kneeling_lunge: "Kneeling Quad",

    // Glutes
    glute_figure_four:      "Seated Figure Four",
    glute_seated_cross_leg: "Cross Leg Fold",
    glute_pigeon:           "Pigeon",
    glute_supine_twist:     "Double Knee Spinal Twist",

    // Calves
    calf_wall_calf_raise: "Single Leg Calf Stretch",
    calf_downward_dog:    "Downward Dog",
    calf_seated_towel:    "Towel Calf Stretch",
    calf_step_drop:       "Leaning Calf",

    // IT Band
    it_standing_cross:   "Spinal Twist",
    it_lying_cross_over: "Spinal Twist",
    it_figure_four_side: "Figure Four Twist",
};

// ─── Convenience helpers using stretch IDs ────────────────────────────────────

export function getBendDataForStretchId(stretchId: string): BendStretch | null {
    const bendName = STRETCH_ID_TO_BEND_NAME[stretchId];
    if (!bendName) return null;
    return getBendData(bendName);
}

export function getImageForStretchId(stretchId: string): ReturnType<typeof require> | null {
    const bendName = STRETCH_ID_TO_BEND_NAME[stretchId];
    if (!bendName) return null;
    return getBendImage(bendName);
}
