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

// ─── Bend stretch data keyed by name (257 stretches, auto-generated from bend_output/stretches.json) ──

const BEND_BY_NAME: Record<string, BendStretch> = {
    "90/90": {
        name: "90/90",
        imageStem: "r1_001_90-90",
        instructions: [
            "Start on the floor in a seated position with your knees bent and your feet flat on the floor.",
            "Let your knees fall to one side so that both knees form 90-degree angles against the floor.",
            "Square your hips to face your front leg, and place your hands on the floor in front of you for support.",
            "Hinge at your hips to gently lean forward over your front leg.",
        ],
        tips: [
            "Keep your back straight and avoid rounding your spine.",
        ],
        modifications: [
            "For less intensity, sit on a cushion or folded blanket to raise your hips.",
        ],
        benefits: [
            "Knees",
            "Groin",
            "Hips",
            "Glutes",
        ],
    },
    "90/90 Hip Switch": {
        name: "90/90 Hip Switch",
        imageStem: "r1_002_90-90_hip_switch",
        instructions: [
            "Start seated on the floor with your knees bent and feet flat on the floor in front of you.",
            "Drop both knees to one side, creating a 90-degree angle with each leg.",
            "Lift your knees and rotate them to the opposite side, switching dynamically.",
        ],
        tips: [
            "Focus on controlled, smooth transitions as you alternate sides.",
            "Move slowly to maintain control, especially if your hips feel tight.",
        ],
        modifications: [
            "Keep your hands on the floor behind you for support if needed.",
        ],
        benefits: [
            "Hips",
            "Core",
            "Glutes",
        ],
    },
    "90/90 Hip Switch (No Hands)": {
        name: "90/90 Hip Switch (No Hands)",
        imageStem: "r1_003_90-90_hip_switch_(no_hands)",
        instructions: [
            "Start in a seated position on the floor with your knees bent and feet flat on the floor, positioned slightly wider than hip-width apart.",
            "Keeping your hands in front of your chest, drop both knees to one side, creating a 90-degree angle with each leg.",
            "Lift your knees and rotate them to the opposite side, maintaining a controlled motion.",
            "Continue alternating sides dynamically.",
        ],
        tips: [
            "Engage your core to maintain balance and control without using your hands.",
            "Keep your chest lifted and your torso upright throughout the movement.",
            "Move slowly and focus on proper form to avoid straining your hips or lower back.",
        ],
        modifications: [
            "Reduce the range of motion if flexibility or balance is limited.",
            "Place your hands behind you for additional support.",
            "Sit on a cushion to elevate your hips for added comfort.",
        ],
        benefits: [
            "Hips",
            "Core",
            "Glutes",
        ],
    },
    "90/90 Hip Switch Extension": {
        name: "90/90 Hip Switch Extension",
        imageStem: "r1_004_90-90_hip_switch_extension",
        instructions: [
            "Start in a seated position on the floor with your knees bent and feet flat on the floor, positioned slightly wider than hip-width apart.",
            "Keeping your hands in front of your chest, drop both knees to one side, creating a 90-degree angle with each leg.",
            "Engage the muscles in your front leg to lift your hips off the floor.",
            "Return to the seated position, lift your knees, and rotate them to the opposite side, repeating the extension on the other side dynamically.",
        ],
        tips: [
            "Engage your core to maintain balance and control without using your hands.",
            "Keep your chest lifted and your torso upright throughout the movement.",
            "Move slowly and focus on proper form to avoid straining your hips or lower back.",
        ],
        modifications: [
            "Reduce the range of motion if flexibility or balance is limited.",
            "Place your hands behind you for additional support.",
            "Sit on a cushion to elevate your hips for added comfort.",
        ],
        benefits: [
            "Hips",
            "Core",
            "Glutes",
        ],
    },
    "Adductor Dips": {
        name: "Adductor Dips",
        imageStem: "r1_005_adductor_dips",
        instructions: [
            "Start in a half-kneeling position with one knee on the floor and the opposite leg bent at 90 degrees to the side, with the foot flat on the floor.",
            "Shift your weight laterally toward the bent leg, dipping your hips to the side while keeping your torso upright.",
            "Return to the starting position and repeat the movement dynamically.",
            "Switch sides at the halfway point.",
        ],
        tips: [
            "Engage your core to maintain balance and control during the lateral shift.",
            "Keep your torso upright and avoid leaning forward or backward.",
        ],
        modifications: [
            "Place a cushion under your kneeling knee for added comfort.",
            "Reduce the depth of the dip if flexibility is limited.",
        ],
        benefits: [
            "Groin",
            "Hips",
        ],
    },
    "Adductor Rocks": {
        name: "Adductor Rocks",
        imageStem: "r1_006_adductor_rocks",
        instructions: [
            "Start in a half-kneeling position with one knee on the floor and the opposite leg extended out to the side, keeping the extended foot flat on the floor.",
            "Place your hands on the floor in front of you for support, keeping your back straight.",
            "Shift your hips back towards your heel, feeling a stretch in the inner thigh of the extended leg.",
            "Rock your hips forward to return to the starting position and repeat the motion dynamically.",
            "Switch sides at the halfway point.",
        ],
        tips: [
            "Move slowly and with control to maximize the stretch and avoid straining.",
            "Keep your extended leg straight and firmly planted on the floor.",
        ],
        modifications: [
            "Place a cushion or folded blanket under your kneeling knee for comfort.",
            "Reduce the depth of the rock if flexibility is limited.",
            "If hands on the floor are uncomfortable, use yoga blocks for support.",
        ],
        benefits: [
            "Groin",
            "Hips",
        ],
    },
    "Air Squats": {
        name: "Air Squats",
        imageStem: "r1_007_air_squats",
        instructions: [
            "Start from a standing position with your feet shoulder-width apart and your toes pointed slightly outward.",
            "Place your hands behind your head or folded in front of your chest.",
            "Lower your hips back and down as if sitting into a chair, keeping your chest up and your weight on your heels.",
            "Push through your heels to stand back up to the starting position and repeat.",
        ],
        tips: [
            "Aim to lower your hips until your thighs are parallel to the floor.",
            "Keep your knees in line with your toes.",
        ],
        modifications: [
            "If squatting deeply is difficult, perform the exercise with a smaller range of motion.",
        ],
        benefits: [
            "Groin",
            "Calves",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Lower Back",
            "Glutes",
        ],
    },
    "Airplane": {
        name: "Airplane",
        imageStem: "r1_008_airplane",
        instructions: [
            "Start lying on your stomach with your arms extended out to the sides at shoulder height.",
            "Engage your lower back and glute muscles to lift your chest and arms off the floor.",
            "Keep your head in line with your spine and hold the position.",
        ],
        tips: [
            "Hold your arms straight out to the sides, like airplane wings.",
            "Squeeze your shoulder blades together as you lift to engage your upper back.",
        ],
        modifications: [
            "For less intensity, lift your chest and arms only slightly off the floor.",
        ],
        benefits: [
            "Upper Back",
            "Shoulders",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Ankle Circles": {
        name: "Ankle Circles",
        imageStem: "r1_009_ankle_circles",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands at your sides or on your hips.",
            "Lift one foot slightly off the floor and point your toes downward.",
            "Rotate your foot in a circular motion, moving through your ankle.",
            "Complete several circles in one direction, then reverse the direction.",
        ],
        tips: [
            "Engage your core to maintain balance and stability.",
            "Move slowly and with control to avoid losing balance.",
            "Keep your standing leg slightly bent to avoid locking your knee.",
        ],
        modifications: [
            "Use a wall or chair for support if balancing is difficult.",
            "If rotating your foot fully is uncomfortable, make smaller circles.",
            "Perform the movement seated if standing feels unstable.",
        ],
        benefits: [
            "Calves",
            "Feet",
            "Shins",
            "Ankles",
        ],
    },
    "Aquaman": {
        name: "Aquaman",
        imageStem: "r1_010_aquaman",
        instructions: [
            "Start lying on your stomach with your arms extended in front of you.",
            "Engage your core to simultaneously lift one arm and your opposite leg off the floor, while keeping your head in line with your spine.",
            "Hold the position and switch sides at the halfway point.",
        ],
        tips: [
            "Focus on engaging your back and glute muscles.",
            "Lengthen your body, reaching with your fingertips and toes.",
            "Keep your head in a neutral position to avoid straining your neck.",
        ],
        modifications: [
            "For less intensity, lift your limbs only slightly off the floor.",
        ],
        benefits: [
            "Upper Back",
            "Shoulders",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Arm Circles": {
        name: "Arm Circles",
        imageStem: "r1_011_arm_circles",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms extended out to the sides.",
            "Make small circles with your arms, gradually increasing the size of the circles.",
            "Reverse the movement at the halfway point.",
        ],
        tips: [],
        modifications: [
            "For less intensity, bend your arms at your elbows and perform smaller circles closer to your body.",
        ],
        benefits: [
            "Neck",
            "Upper Back",
            "Shoulders",
            "Chest",
        ],
    },
    "Arm Swings": {
        name: "Arm Swings",
        imageStem: "r1_012_arm_swings",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms extended out to the sides.",
            "Swing your arms forward across your chest, crossing one arm over the other.",
            "Then swing your arms back out to the sides, opening them wide.",
            "Repeat the motion, alternating which arm crosses over the other each time.",
        ],
        tips: [
            "Start with slower swings and gradually increase speed as you warm up.",
        ],
        modifications: [
            "Keep your arm swings smaller if you experience any discomfort.",
        ],
        benefits: [
            "Triceps",
            "Upper Back",
            "Shoulders",
            "Chest",
            "Biceps",
        ],
    },
    "Baby Cobra": {
        name: "Baby Cobra",
        imageStem: "r1_013_baby_cobra",
        instructions: [
            "Start lying on your stomach with your legs extended and your forearms on the floor in front of you, palms facing down.",
            "Press your forearms into the floor to lift your chest off the ground.",
        ],
        tips: [
            "Keep your shoulders away from your ears, drawing them down and back.",
            "Keep your neck in a neutral position.",
        ],
        modifications: [],
        benefits: [
            "Spine",
            "Shoulders",
            "Chest",
            "Abdomen",
        ],
    },
    "Back Leg Raise": {
        name: "Back Leg Raise",
        imageStem: "r1_014_back_leg_raise",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands at your sides.",
            "Shift your weight onto one leg and engage your core to lift your opposite leg straight behind you.",
            "Keep your hips square and your torso upright and hold the position.",
        ],
        tips: [
            "Keep your standing leg slightly bent to avoid locking the knee.",
            "Focus on a fixed point in front of you to help maintain balance.",
        ],
        modifications: [
            "Lift your leg to a lower height if necessary to maintain proper form.",
            "Perform the exercise near a wall for support if needed.",
        ],
        benefits: [
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Bear Hug": {
        name: "Bear Hug",
        imageStem: "r1_015_bear_hug",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms out to the sides.",
            "Wrap your arms around yourself, placing your hands on your shoulder blades.",
            "Squeeze your arms around your upper body, round your upper back, and tuck your chin to your chest.",
        ],
        tips: [
            "Exhale at the beginning of the movement to make it easier to wrap your arms around your body.",
        ],
        modifications: [
            "For less intensity, perform the exercise with your arms crossed in front of your chest.",
        ],
        benefits: [
            "Spine",
            "Neck",
            "Upper Back",
            "Shoulders",
        ],
    },
    "Bent Arm Pike": {
        name: "Bent Arm Pike",
        imageStem: "r1_016_bent_arm_pike",
        instructions: [
            "Start on the floor in a push-up position.",
            "Engage your core to lift your hips towards the ceiling, forming an inverted \"V\" shape with your body.",
            "Bend your arms to lower your upper body toward the floor.",
            "Distribute your weight evenly between your hands and feet and hold the position.",
        ],
        tips: [
            "Keep your legs straight and your heels off the ground.",
            "Keep your head between your arms and relax your neck.",
        ],
        modifications: [
            "For less intensity, keep your knees slightly bent and lower your hips.",
        ],
        benefits: [
            "Triceps",
            "Shoulders",
            "Chest",
            "Abdomen",
        ],
    },
    "Bent Over Calf": {
        name: "Bent Over Calf",
        imageStem: "r1_017_bent_over_calf",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Step forward with one foot, then bend your opposite leg to lower your hips down and back.",
            "Keep your back foot flat on the floor and keep your front leg straight, lifting your toes to balance on your front heel.",
            "Hinge at your hips, reaching forward with your opposite hand to grab your foot and placing your other hand behind your back.",
        ],
        tips: [
            "Keep your back straight and avoid rounding your spine.",
            "Keep both of your feet pointing forward.",
        ],
        modifications: [],
        benefits: [
            "Calves",
            "Feet",
            "Ankles",
        ],
    },
    "Bicycle Crunch Hold": {
        name: "Bicycle Crunch Hold",
        imageStem: "r1_018_bicycle_crunch_hold",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Place your hands behind your head and engage your core to lift your head and shoulders off the floor.",
            "Extend one leg straight out and bring your opposite knee towards your chest, while rotating your upper body to bring your opposite elbow toward your raised knee.",
            "Hold the position and switch sides at the halfway point.",
        ],
        tips: [
            "Keep your lower back pressed into the floor.",
            "Focus on the rotation of your torso, not just the elbow-to-knee movement.",
            "Avoid pulling on your neck with your hands.",
        ],
        modifications: [],
        benefits: [
            "Obliques",
            "Abdomen",
        ],
    },
    "Bird Dog": {
        name: "Bird Dog",
        imageStem: "r1_019_bird_dog",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Engage your core to simultaneously extend one arm forward and your opposite leg back.",
            "Keep your body in a straight line parallel to the floor and hold the position.",
        ],
        tips: [
            "Avoid arching your back or rotating your hips.",
        ],
        modifications: [
            "For less intensity, lift only your arm or leg individually.",
        ],
        benefits: [
            "Shoulders",
            "Lower Back",
            "Glutes",
        ],
    },
    "Bird Dog Plank": {
        name: "Bird Dog Plank",
        imageStem: "r1_020_bird_dog_plank",
        instructions: [
            "Start on the floor in a push-up position.",
            "wide",
            "Distribute your weight evenly between your hand and foot and hold the position.",
        ],
        tips: [
            "Avoid arching your back or rotating your hips.",
        ],
        modifications: [
            "For less intensity, lift only your arm or leg individually.",
        ],
        benefits: [
            "Shoulders",
            "Lower Back",
            "Glutes",
        ],
    },
    "Bird Dogs": {
        name: "Bird Dogs",
        imageStem: "r1_021_bird_dogs",
        instructions: [
            "Start on your hands and knees with your wrists under your shoulders and knees under your hips.",
            "Extend one arm forward and the opposite leg straight back.",
            "Return to the starting position and repeat on the opposite side.",
            "Alternate sides in a controlled and fluid motion.",
        ],
        tips: [
            "Engage your core to keep your torso stable.",
            "Move slowly and avoid twisting your hips.",
            "Keep your gaze down to maintain a neutral neck position.",
        ],
        modifications: [
            "Perform the movement with a smaller range of motion if balance is challenging.",
            "Keep both hands on the floor and only extend your legs for a simpler variation.",
            "Place a cushion under your knees for added comfort.",
        ],
        benefits: [
            "Shoulders",
            "Hips",
            "Core",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Bow Pose": {
        name: "Bow Pose",
        imageStem: "r1_022_bow_pose",
        instructions: [
            "Start from a lying position on your stomach with your legs extended and arms at your sides.",
            "Bend both knees to bring your heels toward your glutes, then reach back with your hands to grab your ankles.",
            "Press your feet into your hands and lift your chest, head, and thighs off the floor.",
        ],
        tips: [
            "Gaze forward or slightly upward, keeping your neck in a comfortable position.",
        ],
        modifications: [
            "For less intensity, don't lift your chest and thighs off the floor or only grab one leg at a time.",
        ],
        benefits: [
            "Psoas",
            "Spine",
            "Upper Back",
            "Shoulders",
            "Hips",
            "Quadriceps",
            "Chest",
            "Abdomen",
        ],
    },
    "Bridge": {
        name: "Bridge",
        imageStem: "r1_023_bridge",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Engage your core and glutes to lift your hips off the floor, forming a straight line from your knees to your shoulders.",
            "Keep your palms and shoulders pressed into the floor and hold the position.",
        ],
        tips: [
            "Squeeze your glutes at the top of the movement.",
            "Avoid arching your lower back; the movement should come from your hips and glutes.",
        ],
        modifications: [
            "For less intensity, lift your hips only partially off the ground.",
            "If you feel any neck strain, try placing a small, folded towel under your head for support.",
        ],
        benefits: [
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Bridge Leg Lift": {
        name: "Bridge Leg Lift",
        imageStem: "r1_024_bridge_leg_lift",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Engage your core and glutes to lift your hips off the floor, forming a straight line from your knees to your shoulders.",
            "Slowly lift one foot off the ground, extending that leg straight.",
            "Keep your palms and shoulders pressed into the floor and hold the position.",
        ],
        tips: [
            "Keep your hips level and avoid letting them drop on the side of the lifted leg.",
            "Keep the foot of your grounded leg firmly pressed into the floor.",
        ],
        modifications: [
            "For less intensity, only lift your foot slightly off the ground without fully extending your leg.",
        ],
        benefits: [
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Bulldog": {
        name: "Bulldog",
        imageStem: "r1_025_bulldog",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Tuck your toes under and engage your core to lift your knees a few inches off the floor.",
            "Distribute your weight evenly between your hands and the balls of your feet and hold the position.",
        ],
        tips: [
            "Keep your back flat and parallel to the floor.",
            "Maintain a neutral neck position, looking at the floor between your hands.",
        ],
        modifications: [],
        benefits: [
            "Triceps",
            "Upper Back",
            "Shoulders",
            "Chest",
            "Glutes",
        ],
    },
    "Butt Kicks": {
        name: "Butt Kicks",
        imageStem: "r1_026_butt_kicks",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Bend one knee to kick your heel up towards your glute, then alternate legs dynamically.",
            "Continue alternating legs in a controlled, steady rhythm.",
        ],
        tips: [
            "Land softly on the balls of your feet to minimize impact.",
            "Focus on a smooth, rhythmic motion rather than speed.",
            "Keep your upper body relaxed and upright.",
        ],
        modifications: [
            "Perform the movement more slowly for better control.",
            "Reduce the height of the kick if flexibility is limited.",
        ],
        benefits: [
            "Knees",
            "Calves",
            "Feet",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Core",
            "Ankles",
            "Toes",
            "Glutes",
        ],
    },
    "Butterfly": {
        name: "Butterfly",
        imageStem: "r1_027_butterfly",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Bend your knees and bring the soles of your feet together, letting your knees fall out to the sides.",
            "Hold your feet with your hands and gently press your knees towards the floor.",
        ],
        tips: [
            "Pull your feet up and push your knees down with your elbows to deepen the stretch.",
            "Keep your back straight and avoid rounding your spine.",
        ],
        modifications: [
            "If your knees are high off the ground, place cushions under your thighs for support.",
            "Sit on a folded blanket to raise your hips and improve comfort.",
        ],
        benefits: [
            "Groin",
            "Hips",
        ],
    },
    "Cactus Arms": {
        name: "Cactus Arms",
        imageStem: "r1_028_cactus_arms",
        instructions: [
            "Start from a seated position with your back straight and your arms resting at your sides.",
            "Raise your arms to shoulder height, bending your elbows at a 90-degree angle with your palms facing forward.",
            "Keep your elbows in line with your shoulders and your forearms perpendicular to the floor.",
            "Squeeze your shoulder blades together, opening your chest.",
        ],
        tips: [
            "Keep your shoulders relaxed and away from your ears.",
            "Keep your neck long and gaze straight ahead.",
        ],
        modifications: [
            "If you experience shoulder discomfort, lower your elbows slightly.",
            "For added support, practice the pose with your back against a wall.",
        ],
        benefits: [
            "Spine",
            "Neck",
            "Upper Back",
            "Shoulders",
            "Chest",
        ],
    },
    "Cactus Arms (Standing)": {
        name: "Cactus Arms (Standing)",
        imageStem: "r1_029_cactus_arms",
        instructions: [
            "Start from a standing position with your back straight and your arms resting at your sides.",
            "Raise your arms to shoulder height, bending your elbows at a 90-degree angle with your palms facing forward.",
            "Keep your elbows in line with your shoulders and your forearms perpendicular to the floor.",
            "Squeeze your shoulder blades together, opening your chest.",
        ],
        tips: [
            "Keep your shoulders relaxed and away from your ears.",
            "Keep your neck long and gaze straight ahead.",
        ],
        modifications: [
            "If you experience shoulder discomfort, lower your elbows slightly.",
            "For added support, practice the pose with your back against a wall.",
        ],
        benefits: [
            "Spine",
            "Neck",
            "Upper Back",
            "Shoulders",
            "Chest",
        ],
    },
    "Calf Raises": {
        name: "Calf Raises",
        imageStem: "r1_030_calf_raises",
        instructions: [
            "Start from a standing position facing a wall with your feet hip-width apart.",
            "Place your hands on the wall at shoulder height for support.",
            "Keeping your toes pressed into the floor, lift your heels off the ground and hold the position.",
        ],
        tips: [
            "Maintain an upright posture, avoiding leaning into the wall.",
            "Keep both feet pointing straight ahead and avoid letting your ankles roll out to the sides.",
        ],
        modifications: [
            "Use a table or chair for support if you don't have access to a wall.",
        ],
        benefits: [
            "Calves",
            "Feet",
            "Ankles",
            "Toes",
        ],
    },
    "Camel Pose": {
        name: "Camel Pose",
        imageStem: "r1_031_camel_pose",
        instructions: [
            "Start from a kneeling position with your hands on your lower back, fingers pointing down.",
            "Engage your core and thigh muscles to lean back, lifting your chest and creating an arch in your upper back.",
            "If comfortable, reach back one hand at a time to grab your heels.",
            "Open your shoulders and let your head fall back.",
        ],
        tips: [
            "Keep your hips over your knees so your thighs are perpendicular to the floor.",
        ],
        modifications: [
            "If reaching your heels is difficult, keep your hands on your lower back for support.",
            "Perform the stretch with a cushion under your knees for added comfort.",
        ],
        benefits: [
            "Psoas",
            "Spine",
            "Upper Back",
            "Shoulders",
            "Quadriceps",
            "Chest",
            "Abdomen",
        ],
    },
    "Cat Cow": {
        name: "Cat Cow",
        imageStem: "r1_032_cat_cow",
        instructions: [
            "Start on your hands and knees in the tabletop position.",
            "Align your wrists under your shoulders and your knees under your hips.",
            "Inhale, dropping your belly towards the floor and arching your back, and lifting your chin and chest to look up toward the ceiling.",
            "Exhale, drawing your belly up toward your spine and rounding your back, and tucking your chin to your chest.",
        ],
        tips: [
            "Move slowly between the poses, coordinating each movement with your breath.",
        ],
        modifications: [
            "If you have neck issues, keep your head in a neutral position rather than lifting and tucking your chin.",
        ],
        benefits: [
            "Spine",
            "Neck",
            "Upper Back",
            "Lower Back",
            "Abdomen",
        ],
    },
    "Chair Pose": {
        name: "Chair Pose",
        imageStem: "r1_033_chair_pose",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Raise your arms overhead, keeping them shoulder-width apart and your palms facing each other.",
            "Bend your knees and lower your hips as if you are sitting back into a chair.",
            "Keep your chest lifted and your weight in your heels, ensuring your knees don't go past your toes.",
        ],
        tips: [
            "Keep your spine long and avoid arching your lower back.",
        ],
        modifications: [
            "For less intensity, perform the pose with a smaller bend in your knees.",
            "If raising your arms overhead is uncomfortable, keep your hands clasped together in front of your chest.",
        ],
        benefits: [
            "Upper Back",
            "Shoulders",
            "Hamstrings",
            "Quadriceps",
            "Lower Back",
            "Glutes",
        ],
    },
    "Chest Opener": {
        name: "Chest Opener",
        imageStem: "r1_034_chest_opener",
        instructions: [
            "Start from a seated position with your back straight and your arms resting at your sides.",
            "Clasp your hands behind your head and widen your arms to bring your elbows out and back.",
            "Gently squeeze your shoulder blades together and open your chest.",
        ],
        tips: [
            "Lower your shoulders and relax your neck.",
            "Keep your back and spine straight.",
        ],
        modifications: [
            "If clasping your hands behind your head is difficult, use a strap or towel to hold onto.",
        ],
        benefits: [
            "Shoulders",
            "Chest",
            "Abdomen",
        ],
    },
    "Chest Opener (Standing)": {
        name: "Chest Opener (Standing)",
        imageStem: "r1_035_chest_opener",
        instructions: [
            "Start from a standing position with your feet hip-width apart.",
            "Clasp your hands behind your head and widen your arms to bring your elbows out and back.",
            "Gently squeeze your shoulder blades together and open your chest.",
        ],
        tips: [
            "Lower your shoulders and relax your neck.",
            "Keep your back and spine straight.",
        ],
        modifications: [
            "If clasping your hands behind your head is difficult, use a strap or towel to hold onto.",
        ],
        benefits: [
            "Shoulders",
            "Chest",
            "Abdomen",
        ],
    },
    "Child's Pose": {
        name: "Child's Pose",
        imageStem: "r1_036_child's_pose",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Widen your knees and bring your big toes together so they're touching.",
            "Sit back on your heels, then reach forward with your hands and lower your chest toward the floor.",
            "Relax your hips and rest your forehead on the floor.",
        ],
        tips: [
            "Walk your fingertips forward to increase the stretch.",
            "Allow your chest to sink towards the floor.",
        ],
        modifications: [
            "For less intensity, don't spread your knees as wide.",
            "If your forehead doesn't reach the floor, rest it on a block or folded blanket.",
        ],
        benefits: [
            "Feet",
            "Shins",
            "Shoulders",
            "Hips",
            "Lower Back",
            "Ankles",
        ],
    },
    "Chin Retractions": {
        name: "Chin Retractions",
        imageStem: "r1_037_chin_retractions",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms at your sides.",
            "Engage your neck muscles to tuck your chin down and draw it backwards.",
            "Use your hand to assist the movement and hold the position.",
        ],
        tips: [
            "Keep your shoulders relaxed and avoid tilting your head up or down.",
        ],
        modifications: [
            "To ensure proper form, perform the exercise while lying on your back.",
        ],
        benefits: [
            "Neck",
        ],
    },
    "Cobra": {
        name: "Cobra",
        imageStem: "r1_038_cobra",
        instructions: [
            "Start lying on your stomach with your legs extended and your hands under your shoulders.",
            "Press your palms into the floor, straightening your arms to lift your upper body off the ground.",
            "Lift your chest towards the ceiling, relax your shoulders, and look slightly upward.",
        ],
        tips: [
            "Keep your arms straight or keep a slight bend in your elbows.",
        ],
        modifications: [
            "For less intensity, keep your forearms on the floor.",
        ],
        benefits: [
            "Spine",
            "Shoulders",
            "Hips",
            "Chest",
            "Abdomen",
        ],
    },
    "Controlled Butt Kicks": {
        name: "Controlled Butt Kicks",
        imageStem: "r1_039_controlled_butt_kicks",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Bend one knee and kick your heel up towards your glute, then quickly switch to the other leg.",
            "Continue alternating legs in a controlled, dynamic motion.",
            "Keep your upper body upright and relaxed.",
        ],
        tips: [
            "Focus on controlled movements rather than speed.",
        ],
        modifications: [
            "Perform the kicks more slowly if balance is an issue.",
            "Hold onto a wall or chair for extra support.",
            "Reduce the height of the kick if flexibility is limited.",
        ],
        benefits: [
            "Calves",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Corner Pecs": {
        name: "Corner Pecs",
        imageStem: "r1_040_corner_pecs",
        instructions: [
            "Start from a standing position facing the inside corner of a wall.",
            "Place your palms and forearms against the wall at shoulder height, forming 90-degree angles at your elbows.",
            "Step forward with one leg and and lean forward until you feel a stretch in your chest.",
        ],
        tips: [
            "Keep your shoulder blades pulled down and back.",
        ],
        modifications: [],
        benefits: [
            "Spine",
            "Upper Back",
            "Shoulders",
            "Chest",
        ],
    },
    "Couch Stretch": {
        name: "Couch Stretch",
        imageStem: "r1_041_couch_stretch",
        instructions: [
            "Start on one knee in front of a bench or couch.",
            "Lift your bottom leg to place your back foot on the bench while keeping your back knee and front foot flat on the floor.",
            "Push your hips forward while keeping your chest lifted and your back straight.",
        ],
        tips: [
            "Keep your front knee aligned over your ankle, not extending past your toes.",
        ],
        modifications: [
            "For less intensity, perform the exercise with your back foot on the floor.",
        ],
        benefits: [
            "Psoas",
            "Hips",
            "Quadriceps",
            "Abdomen",
        ],
    },
    "Cow Face": {
        name: "Cow Face",
        imageStem: "r1_042_cow_face",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms at your sides.",
            "Lift one arm overhead, then bend your elbow to place your hand between your shoulder blades.",
            "Lift your other arm out to the side, then bend your elbow to bring it behind your back.",
            "Clasp your hands together behind your back.",
        ],
        tips: [
            "Keep your chest lifted and your back straight.",
        ],
        modifications: [
            "For less intensity, place one hand on your upper back and the other on your lower back.",
        ],
        benefits: [
            "Triceps",
            "Shoulders",
        ],
    },
    "Cross Leg Fold": {
        name: "Cross Leg Fold",
        imageStem: "r1_043_cross_leg_fold",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Cross one foot over the other, then slowly bend forward from your hips, lowering your upper body towards your legs.",
            "Let your arms hang down and try to touch the floor with your hands.",
        ],
        tips: [
            "Keep your weight evenly distributed between both feet.",
            "Keep your spine long and avoid rounding your back.",
            "Relax your neck and let your head hang.",
        ],
        modifications: [
            "If you can't reach the floor, place your hands on your ankles or shins.",
        ],
        benefits: [
            "Hips",
            "Hamstrings",
            "Lower Back",
        ],
    },
    "Cross Leg Side Bend": {
        name: "Cross Leg Side Bend",
        imageStem: "r1_044_cross_leg_side_bend",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms resting at your sides.",
            "Step forward with one leg and raise your opposite arm toward the ceiling, coming up onto the toes of your back foot.",
            "Place your other hand on your hip and gently bend to the side, reaching over with your raised arm.",
        ],
        tips: [
            "Keep your hips and shoulders square and avoid twisting your torso.",
        ],
        modifications: [
            "If reaching overhead is uncomfortable, place your hand on the side of your head.",
        ],
        benefits: [
            "Psoas",
            "Spine",
            "Obliques",
            "Lower Back",
            "Lats",
            "Abdomen",
        ],
    },
    "Crunch Hold": {
        name: "Crunch Hold",
        imageStem: "r1_045_crunch_hold",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Engage your core to lift your head, neck, and shoulders off the floor.",
            "Reach forward with your arms and hold the position.",
        ],
        tips: [
            "Keep your arms straight and parallel to the floor.",
            "Keep your lower back pressed into the floor.",
        ],
        modifications: [],
        benefits: [
            "Abdomen",
        ],
    },
    "Crunches": {
        name: "Crunches",
        imageStem: "r1_046_crunches",
        instructions: [
            "Start lying on your back with your knees bent and feet flat on the floor, hip-width apart.",
            "Place your hands behind your head with your elbows wide, or cross them over your chest.",
            "Engage your core and lift your shoulders off the floor, bringing your chest slightly towards your knees.",
            "Lower your shoulders back to the floor with control.",
        ],
        tips: [
            "Keep your gaze slightly upward to maintain a neutral neck position.",
            "Engage your core throughout the movement to avoid pulling on your neck.",
            "Exhale as you lift and inhale as you lower for steady breathing.",
        ],
        modifications: [
            "If full crunches are too intense, perform smaller movements by lifting only slightly off the floor.",
            "Support your head with a small cushion or towel to reduce neck strain.",
        ],
        benefits: [
            "Obliques",
            "Abdomen",
        ],
    },
    "Curtsy Lunge Hold": {
        name: "Curtsy Lunge Hold",
        imageStem: "r1_047_curtsy_lunge_hold",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Step one foot diagonally behind you, crossing it behind your front leg.",
            "Bend both knees to lower your hips until your front thigh is parallel to the floor and your back knee is just above the floor.",
            "Bring your arms in front of your chest and hold the position.",
        ],
        tips: [
            "Keep your chest lifted and your back straight.",
            "Engage your glutes and inner thighs to maintain stability.",
        ],
        modifications: [
            "For less intensity, don't lower your hips as much.",
            "Use a chair or wall for balance and support if needed.",
        ],
        benefits: [
            "Calves",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Dead Bug": {
        name: "Dead Bug",
        imageStem: "r1_048_dead_bug",
        instructions: [
            "Start lying on your back with your legs extended and your arms straight above your head.",
            "Engage your core to raise one arm toward the ceiling and bend your opposite knee to bring it up over your hip.",
            "Raise your other arm and leg slightly off the floor and hold the position.",
        ],
        tips: [
            "Keep your hips square and your lower back pressed into the floor.",
        ],
        modifications: [
            "For less intensity, perform the exercise with a smaller range of motion.",
        ],
        benefits: [
            "Shoulders",
            "Hips",
            "Quadriceps",
            "Abdomen",
        ],
    },
    "Dead Bugs": {
        name: "Dead Bugs",
        imageStem: "r1_049_dead_bugs",
        instructions: [
            "Start lying on your back with your legs bent at 90 degrees and your arms extended towards the ceiling.",
            "Lower one arm and the opposite leg towards the floor while keeping the other arm and leg stable.",
            "Return to the starting position and repeat on the opposite side.",
            "Alternate sides in a controlled manner.",
        ],
        tips: [
            "Engage your core to keep your lower back pressed into the floor.",
            "Move slowly to maintain control.",
            "Breathe steadily, exhaling as you lower your arm and leg.",
        ],
        modifications: [
            "Reduce the range of motion if the exercise feels too intense.",
            "Perform the movement with only your arms or legs moving.",
            "Place a cushion under your lower back for added support.",
        ],
        benefits: [
            "Shoulders",
            "Hips",
            "Lower Back",
            "Abdomen",
        ],
    },
    "Dead Hang": {
        name: "Dead Hang",
        imageStem: "r1_050_dead_hang",
        instructions: [
            "Start from a standing position under a pull-up bar.",
            "Grip the bar with your palms facing forward and your hands slightly wider than shoulder-width apart.",
            "Lift your feet off the ground, allowing your body to hang freely.",
        ],
        tips: [
            "Keep your arms straight but not locked and relax your shoulders.",
            "Feel the stretch through your spine and shoulders.",
        ],
        modifications: [
            "For less intensity, keep your feet or toes touching the floor for partial support.",
        ],
        benefits: [
            "Spine",
            "Forearms",
            "Upper Back",
            "Shoulders",
            "Chest",
            "Biceps",
            "Hands",
            "Lats",
        ],
    },
    "Deep Split Squat": {
        name: "Deep Split Squat",
        imageStem: "r1_051_deep_split_squat",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Step one foot back into a lunge position, then slowly lower your body while keeping your back leg straight.",
            "Allow your front knee to move forward over your toes and keep your back knee above the floor.",
            "Keep your back straight and your torso upright.",
        ],
        tips: [
            "Keep your front foot planted firmly into the floor.",
            "Ensure your front knee is stable and doesn't cave inward.",
        ],
        modifications: [
            "For less intensity, don't lower as deeply or keep your back knee on the ground.",
            "Use a chair or wall for additional support if needed.",
        ],
        benefits: [
            "Hips",
            "Quadriceps",
            "Abdomen",
        ],
    },
    "Dip Hold": {
        name: "Dip Hold",
        imageStem: "r1_052_dip_hold",
        instructions: [
            "Start on the floor in a seated position with your knees bent and your feet flat on the floor.",
            "Place your palms on the floor behind you with your fingers pointing toward your feet.",
            "Keeping your elbow bent, lift your hips off the floor and hold the position.",
        ],
        tips: [
            "Keep your elbows close to your body and your wrists under your shoulders.",
        ],
        modifications: [
            "For less intensity, don't lower yourself down as much.",
            "If you feel wrist strain, try turning your hands out slightly to the sides.",
        ],
        benefits: [
            "Triceps",
            "Shoulders",
            "Chest",
            "Abdomen",
        ],
    },
    "Diver": {
        name: "Diver",
        imageStem: "r1_053_diver",
        instructions: [
            "Start from a seated position with your back straight and your arms resting at your sides.",
            "Extend your arms out in front of you, bringing your hands together so one hand is on top of the other.",
            "Tuck your head down between your arms and round your back while reaching forward with your hands.",
        ],
        tips: [
            "Keep your core engaged and your feet flat on the floor.",
        ],
        modifications: [],
        benefits: [
            "Spine",
            "Neck",
            "Upper Back",
            "Shoulders",
            "Lower Back",
        ],
    },
    "Diver (Standing)": {
        name: "Diver (Standing)",
        imageStem: "r1_054_diver",
        instructions: [
            "Start from a standing position with your back straight and your arms resting at your sides.",
            "Extend your arms out in front of you, bringing your hands together so one hand is on top of the other.",
            "Tuck your head down between your arms and round your back while reaching forward with your hands.",
        ],
        tips: [
            "Keep your core engaged and your feet flat on the floor.",
        ],
        modifications: [],
        benefits: [
            "Neck",
            "Upper Back",
            "Shoulders",
            "Lower Back",
        ],
    },
    "Doorway Pecs": {
        name: "Doorway Pecs",
        imageStem: "r1_055_doorway_pecs",
        instructions: [
            "Start from a standing position in an open doorway.",
            "Place both of your palms and forearms against the sides of the doorframe at shoulder height, forming 90-degrees at your elbows.",
            "Step one foot forward and lean forward through the doorway until your feel a stretch in your chest.",
        ],
        tips: [
            "Keep your shoulder blades pulled down and back.",
            "Maintain a neutral spine and avoid arching your lower back.",
        ],
        modifications: [
            "For less intensity, don't lean as far forward.",
        ],
        benefits: [
            "Shoulders",
            "Chest",
        ],
    },
    "Double Knee Spinal Twist": {
        name: "Double Knee Spinal Twist",
        imageStem: "r1_056_double_knee_spinal_twist",
        instructions: [
            "Start lying on your back with your knees bent and feet flat on the floor.",
            "Lift your knees towards your chest and let them fall gently to one side.",
            "Keep your shoulders flat against the floor and extend your arms out to the sides, palms facing up.",
        ],
        tips: [
            "Breathe deeply and evenly, allowing your body to relax into the twist.",
        ],
        modifications: [
            "For less intensity, reduce the twist by keeping your knees higher and closer to your body.",
        ],
        benefits: [
            "Spine",
            "IT Band",
            "Obliques",
            "Lower Back",
        ],
    },
    "Double Pigeon": {
        name: "Double Pigeon",
        imageStem: "r1_057_double_pigeon",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Bend one knee and bring your shin parallel to your shoulders.",
            "Bend the opposite knee, stacking your shin on top of the other, and aligning your ankle over your bottom knee.",
            "Sit up tall and rest your hands on the floor to your sides.",
        ],
        tips: [
            "Keep your back straight and avoid rounding your spine.",
            "Flex both feet to protect your knees.",
        ],
        modifications: [
            "Perform the movement with one leg extended if necessary.",
        ],
        benefits: [
            "Groin",
            "IT Band",
            "Hips",
            "Hamstrings",
            "Glutes",
        ],
    },
    "Down Dog Split": {
        name: "Down Dog Split",
        imageStem: "r1_058_down_dog_split",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Tuck your toes under, press your palms into the floor, and straighten your arms and legs to lift your hips up and back.",
            "Push your chest toward your thighs and your heels toward the floor.",
            "Raise one leg towards the ceiling, creating a straight line from your hands to your raised foot.",
        ],
        tips: [
            "Keep your hips square to the floor and avoid rotating them outward.",
            "Breathe deeply, focusing on extending your leg and lengthening your body.",
        ],
        modifications: [
            "For less intensity, keep a slight bend in your lifted leg or standing knee.",
            "If lifting your leg is uncomfortable, lift it only slightly off the floor.",
        ],
        benefits: [
            "Triceps",
            "Calves",
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Glutes",
        ],
    },
    "Downward Dog": {
        name: "Downward Dog",
        imageStem: "r1_059_downward_dog",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Tuck your toes under, press your palms into the floor, and straighten your arms and legs to lift your hips up and back.",
            "Push your chest toward your thighs and your heels toward the floor.",
        ],
        tips: [
            "Relax your shoulders and let your head hang between your arms.",
            "Distribute your weight evenly between your hands and feet.",
            "Keep a slight bend in your knees to avoid hyperextension",
        ],
        modifications: [
            "For less intensity, bend your knees more or place your hands on the edge of a chair.",
            "To reduce pressure on your wrists, place your forearms on the floor or use a block under your hands.",
        ],
        benefits: [
            "Calves",
            "Shoulders",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Dynamic Chest Flys": {
        name: "Dynamic Chest Flys",
        imageStem: "r1_060_dynamic_chest_flys",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms bent at 90 degrees, elbows at shoulder height, and fingers pointing upward.",
            "Bring your elbows and forearms together in front of your chest, keeping them bent at 90 degrees.",
            "Return to the starting position and repeat the movement in a controlled, fluid rhythm.",
        ],
        tips: [
            "Focus on squeezing through your chest as you bring your arms together.",
            "Keep your shoulders relaxed and avoid shrugging them.",
        ],
        modifications: [
            "Perform the movement more slowly for better control.",
            "Reduce the range of motion if shoulder discomfort occurs.",
        ],
        benefits: [
            "Shoulders",
            "Chest",
        ],
    },
    "Dynamic Quad Stretch": {
        name: "Dynamic Quad Stretch",
        imageStem: "r1_061_dynamic_quad_stretch",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Lift one foot behind you and grab your ankle with the same-side hand, pulling it gently towards your glutes.",
            "Release your foot and return to standing before repeating the stretch.",
            "Repeat the movement and switch sides at the halfway point.",
        ],
        tips: [
            "Keep your knees close together as you stretch to avoid unnecessary strain.",
            "Engage your core to maintain balance and stability.",
            "Focus on steady, controlled movements for effectiveness.",
        ],
        modifications: [
            "Use a wall or chair for balance if needed.",
            "Perform a smaller range of motion if flexibility is limited.",
        ],
        benefits: [
            "Hips",
            "Quadriceps",
        ],
    },
    "Dynamic Side Bends": {
        name: "Dynamic Side Bends",
        imageStem: "r1_062_dynamic_side_bends",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Reach one arm overhead while bending your torso to the opposite side.",
            "Return to the starting position and repeat on the other side, alternating sides dynamically.",
        ],
        tips: [
            "Engage your core to avoid overextending your lower back.",
            "Keep your movements smooth and steady.",
            "Focus on lengthening through the side of your body as you bend.",
        ],
        modifications: [
            "Reduce the depth of the side bend if flexibility is limited.",
            "Perform the movement more slowly to maintain better control.",
        ],
        benefits: [
            "IT Band",
            "Obliques",
            "Shoulders",
            "Core",
            "Abdomen",
        ],
    },
    "Dynamic Wide Leg Forward Fold": {
        name: "Dynamic Wide Leg Forward Fold",
        imageStem: "r1_063_dynamic_wide_leg_forward_fold",
        instructions: [
            "Start from a standing position with a wide stance and your hands resting on your hips.",
            "Hinge forward at your hips, lowering your torso towards the floor while keeping your back straight.",
            "Return to standing and repeat the movement in a controlled rhythm.",
        ],
        tips: [
            "Focus on keeping your legs straight but soft at the knees.",
            "Engage your core to protect your lower back.",
            "Keep your neck relaxed and in line with your spine.",
        ],
        modifications: [
            "Reduce the depth of the forward fold if flexibility is limited.",
            "Place your hands on a block or chair for support.",
            "Bend your knees slightly if hamstring tightness prevents a full fold.",
        ],
        benefits: [
            "Calves",
            "Hamstrings",
            "Core",
            "Lower Back",
        ],
    },
    "Eagle Arm": {
        name: "Eagle Arm",
        imageStem: "r1_064_eagle_arm",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms straight out in front of you at shoulder height.",
            "Cross one arm over the other at the elbows, then bend your arms to bring your forearms perpendicular to the floor.",
            "Wrap your forearms around each other to bring your palms together.",
        ],
        tips: [
            "Keep your shoulders relaxed and try to create space between your shoulder blades.",
        ],
        modifications: [
            "If your palms don't touch, press the backs of your hands together instead.",
        ],
        benefits: [
            "Triceps",
            "Upper Back",
            "Shoulders",
            "Lats",
        ],
    },
    "Ear-to-Shoulder": {
        name: "Ear-to-Shoulder",
        imageStem: "r1_065_ear-to-shoulder",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms at your sides.",
            "Slowly tilt your head to one side, bringing your ear towards your shoulder.",
            "Place your opposite hand behind your back and your other hand on the top of your head and gently pull down.",
        ],
        tips: [
            "Keep your back straight and your shoulders relaxed.",
            "Don't lift or tuck your chin; keep it in a neutral position.",
        ],
        modifications: [],
        benefits: [
            "Neck",
            "Shoulders",
        ],
    },
    "Elbow Pike": {
        name: "Elbow Pike",
        imageStem: "r1_066_elbow_pike",
        instructions: [
            "Start on the floor in a push-up position with your forearms on the floor.",
            "Engage your core to lift your hips towards the ceiling, forming an inverted \"V\" shape with your body.",
            "Distribute your weight evenly between your forearms and feet and hold the position.",
        ],
        tips: [
            "Keep your legs straight and your heels off the ground.",
            "Keep your head between your arms and relax your neck.",
        ],
        modifications: [
            "For less intensity, keep your knees slightly bent and lower your hips.",
            "Use a cushion under your forearms for extra support.",
        ],
        benefits: [
            "Triceps",
            "Shoulders",
            "Chest",
            "Abdomen",
        ],
    },
    "Elbow Plank": {
        name: "Elbow Plank",
        imageStem: "r1_067_elbow_plank",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Lower your forearms to the floor, then step back with both feet so your legs are fully extended.",
            "Engage your core to keep your body in a straight line from your head to your heels.",
            "Distribute your weight evenly between your forearms and feet and hold the position.",
        ],
        tips: [
            "Align your elbows directly under your shoulders.",
            "Avoid arching your lower back or lifting your hips too high.",
        ],
        modifications: [
            "For less intensity, drop to your knees while maintaining a straight line from knees to head.",
        ],
        benefits: [
            "Triceps",
            "Upper Back",
            "Obliques",
            "Shoulders",
            "Chest",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Elbow Plank Leg Lift": {
        name: "Elbow Plank Leg Lift",
        imageStem: "r1_068_elbow_plank_leg_lift",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Lower your forearms to the floor, then step back with both feet so your legs are fully extended.",
            "Engage your core to keep your body in a straight line, and lift one of your legs off the floor toward the ceiling.",
            "Distribute your weight evenly between your forearms and foot and hold the position.",
        ],
        tips: [
            "Align your elbows directly under your shoulders.",
            "Focus on keeping your hips level and avoid rotating them.",
            "Keep your raised leg at hip height or as high as you can while maintaining good form.",
        ],
        modifications: [
            "For less intensity, lower your bottom knee to the floor.",
        ],
        benefits: [
            "Triceps",
            "Upper Back",
            "Obliques",
            "Shoulders",
            "Chest",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Elbow Side Plank": {
        name: "Elbow Side Plank",
        imageStem: "r1_069_elbow_side_plank",
        instructions: [
            "Start lying on your side with your legs extended and your feet stacked on top of each other.",
            "Place your bottom elbow under your shoulder and your forearm flat on the floor.",
            "Engage your core and lift your hips off the floor, creating a straight line from your head to your heels.",
            "Rest your top hand on your hip and hold the position.",
        ],
        tips: [
            "Keep your hips lifted and in line with your body.",
        ],
        modifications: [
            "For less intensity, lower your bottom knee to the floor for support.",
        ],
        benefits: [
            "Triceps",
            "Obliques",
            "Shoulders",
            "Abdomen",
        ],
    },
    "Elbow Side Plank Leg Lift": {
        name: "Elbow Side Plank Leg Lift",
        imageStem: "r1_070_elbow_side_plank_leg_lift",
        instructions: [
            "Start lying on your side with your legs extended and your feet stacked on top of each other.",
            "Place your bottom elbow under your shoulder and your forearm flat on the floor.",
            "Engage your core and lift your hips off the floor, creating a straight line from your head to your heels.",
            "Rest your top hand on your hip and lift your top leg toward the ceiling and hold the position.",
        ],
        tips: [
            "Keep your hips lifted and in line with your body.",
        ],
        modifications: [
            "For less intensity, lower your bottom knee to the floor for support.",
        ],
        benefits: [
            "Triceps",
            "Obliques",
            "Shoulders",
            "Glutes",
            "Abdomen",
        ],
    },
    "Figure Four Twist": {
        name: "Figure Four Twist",
        imageStem: "r1_071_figure_four_twist",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Lift one leg and cross your ankle over your opposite thigh, just above the knee.",
            "Let both legs fall to the side, so your top foot and bottom leg are flat on the floor.",
        ],
        tips: [
            "Keep your shoulders flat on the floor.",
        ],
        modifications: [],
        benefits: [
            "Spine",
            "IT Band",
            "Hips",
            "Lower Back",
            "Glutes",
        ],
    },
    "Flutter Kicks": {
        name: "Flutter Kicks",
        imageStem: "r1_072_flutter_kicks",
        instructions: [
            "Start lying on your back with your legs extended and your arms at your sides.",
            "Engage your core and lift both legs slightly off the floor.",
            "Alternate kicking your legs up and down in a controlled, small range of motion.",
            "Continue the movement without letting your legs touch the floor.",
        ],
        tips: [
            "Engage your core throughout to avoid straining your lower back.",
            "Keep your movements controlled and steady.",
            "Breathe evenly as you perform the kicks.",
        ],
        modifications: [
            "Place your hands under your hips for added lower back support.",
            "If the exercise is too intense, perform the kicks with your legs higher off the floor.",
            "Reduce the range of motion if needed.",
        ],
        benefits: [
            "Obliques",
            "Hips",
            "Abdomen",
        ],
    },
    "Folded Butterfly": {
        name: "Folded Butterfly",
        imageStem: "r1_073_folded_butterfly",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Bend your knees and bring the soles of your feet together, letting your knees fall out to the sides.",
            "Place your hands on the floor in front of you and hinge at your hips, folding forward over your feet.",
        ],
        tips: [
            "Allow your head to relax towards your feet.",
        ],
        modifications: [
            "If your hips are tight, sit on a folded blanket to elevate your hips.",
            "For a gentler stretch, keep your torso more upright.",
        ],
        benefits: [
            "Knees",
            "Groin",
            "Hips",
            "Lower Back",
        ],
    },
    "Forearm Stretch": {
        name: "Forearm Stretch",
        imageStem: "r1_074_forearm_stretch",
        instructions: [
            "Start from a seated position with your back straight and your arms resting at your sides.",
            "Extend one arm in front of you with your palm facing up.",
            "Use your opposite hand to gently pull your fingers back towards your body.",
        ],
        tips: [],
        modifications: [
            "Keep a slight bend in your elbow if straightening your arm fully is uncomfortable.",
        ],
        benefits: [
            "Forearms",
            "Fingers",
            "Hands",
        ],
    },
    "Forward Fold": {
        name: "Forward Fold",
        imageStem: "r1_075_forward_fold",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands interlaced behind your back.",
            "Slowly bend forward from your hips, letting your upper body hang down toward the floor.",
            "Extend your arms and let your hands fall forward over your head.",
        ],
        tips: [
            "Let your head and neck relax completely.",
            "Keep your legs straight but not locked.",
        ],
        modifications: [
            "If interlacing your fingers is difficult, hold a strap or towel between your hands.",
        ],
        benefits: [
            "Calves",
            "Upper Back",
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Chest",
            "Glutes",
        ],
    },
    "Frog Pose": {
        name: "Frog Pose",
        imageStem: "r1_076_frog_pose",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Lower your forearms to the ground and widen your knees out to sides, keeping your hips in line with your knees and your toes pointed outward.",
            "Gently press your hips back towards your heels.",
        ],
        tips: [
            "Keep your chest lifted and your gaze forward.",
        ],
        modifications: [
            "Bring your knees closer together to reduce the intensity.",
        ],
        benefits: [
            "Groin",
            "Hips",
            "Lower Back",
        ],
    },
    "Front Leg Raise": {
        name: "Front Leg Raise",
        imageStem: "r1_077_front_leg_raise",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands on your hips.",
            "Shift your weight onto one leg and engage your core to lift your opposite leg straight in front of you.",
            "Keep your hips square and your torso upright and hold the position.",
        ],
        tips: [
            "Lift your extended leg to hip height or as high as comfortable.",
            "Keep your standing leg slightly bent to avoid locking the knee.",
            "Focus on a fixed point in front of you to help maintain balance.",
        ],
        modifications: [
            "Lift your leg to a lower height if necessary to maintain proper form.",
            "Perform the exercise near a wall for support if needed.",
        ],
        benefits: [
            "Hips",
            "Quadriceps",
            "Abdomen",
        ],
    },
    "Front Split": {
        name: "Front Split",
        imageStem: "r1_078_front_split",
        instructions: [
            "Start from a kneeling position with your hands at your sides.",
            "Extend one leg in front of you and lean forward to place your hands on the floor in front of you.",
            "Lift your back knee off the floor to straighten your leg, then slowly slide your foot back and lower your hips toward the floor.",
        ],
        tips: [
            "Keep your hips square and your torso upright.",
        ],
        modifications: [
            "If the stretch is too intense, use blocks under your hands for support.",
            "Keep a slight bend in your front knee if straightening your leg fully is uncomfortable.",
        ],
        benefits: [
            "Groin",
            "Calves",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Gate Opener": {
        name: "Gate Opener",
        imageStem: "r1_079_gate_opener",
        instructions: [
            "Start from a standing position with your hand placed on  a wall or chair for support.",
            "Shift your weight onto your leg closest to the wall.",
            "Then, as if stepping over a gate, swing your opposite leg up, rotate your leg outward to open your hip, then bring your leg back down to the floor.",
            "Reverse the movement to return to starting position, then repeat the motion back and forth.",
        ],
        tips: [
            "Keep the movement smooth and controlled.",
            "Keep your standing leg active with a slight bend in your knee.",
            "Keep your upper body stable; the movement should come from your hip.",
        ],
        modifications: [],
        benefits: [
            "Groin",
            "Hips",
            "Glutes",
        ],
    },
    "Good Mornings": {
        name: "Good Mornings",
        imageStem: "r1_080_good_mornings",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands behind your head.",
            "Hinge forward at your hips, lowering your torso while keeping your back straight.",
            "Return to standing in a controlled motion and repeat.",
        ],
        tips: [
            "Focus on maintaining a neutral spine and avoid rounding your back.",
            "Engage your core to support your lower back.",
            "Keep a slight bend in your knees to avoid locking them.",
        ],
        modifications: [
            "Reduce the depth of the hinge if flexibility is limited.",
            "Place your hands on your thighs for added support.",
        ],
        benefits: [
            "Hamstrings",
            "Core",
            "Lower Back",
            "Glutes",
        ],
    },
    "Half Bow": {
        name: "Half Bow",
        imageStem: "r1_081_half_bow",
        instructions: [
            "Start lying on your stomach with your legs extended and your forearms on the floor.",
            "Bend one leg at the knee to bring your heel towards your glute, then reach back with your hand to grab your ankle.",
            "Press your foot into your hand and lift your chest and thigh off the floor.",
        ],
        tips: [
            "Keep your left leg active by pressing it into the floor.",
            "Keep both legs parallel and in a straight line.",
        ],
        modifications: [
            "For less intensity, keep your chest on the floor and only lift your leg.",
        ],
        benefits: [
            "Psoas",
            "Spine",
            "Upper Back",
            "Shoulders",
            "Hips",
            "Quadriceps",
            "Chest",
            "Abdomen",
        ],
    },
    "Half Moon": {
        name: "Half Moon",
        imageStem: "r1_082_half_moon",
        instructions: [
            "Start in a standing lunge position and place your front hand on the floor in front of your foot.",
            "Lift your back leg off the ground, extending it straight behind you at hip level.",
            "Open your torso to the side, reaching your top arm towards the ceiling and stacking your shoulders.",
            "Keep your gaze straight ahead or upward towards your raised hand.",
        ],
        tips: [
            "Engage your core to maintain stability and balance.",
            "Keep your standing leg slightly bent to avoid locking the knee.",
            "Press firmly through your standing foot and extend through your lifted leg.",
        ],
        modifications: [
            "If balance is challenging, use a block or place your hand on a chair for support.",
            "If keeping your gaze upward is difficult, look down at the floor for more stability.",
            "If raising your arm is uncomfortable, rest your top hand on your hip.",
        ],
        benefits: [
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Chest",
            "Glutes",
        ],
    },
    "Half Wheel": {
        name: "Half Wheel",
        imageStem: "r1_083_half_wheel",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Place your hands on the floor beside your ears with your fingers pointing towards your shoulders.",
            "Press through your feet to lift your hips and upper back off the floor, then push through your hands to lift your head and shoulders off the floor.",
            "Rest your head on the floor and form an arch with your body.",
        ],
        tips: [
            "Distribute your weight evenly between your hands and feet; don't place too much weight on your head and neck.",
            "Keep your knees aligned with your hips and feet.",
            "Keep your elbows close to your sides.",
        ],
        modifications: [
            "For less intensity, only lift your hips and keep your upper back and head on the floor.",
        ],
        benefits: [
            "Psoas",
            "Spine",
            "Hips",
            "Quadriceps",
            "Chest",
            "Abdomen",
        ],
    },
    "Half-Kneeling Hip Hinge": {
        name: "Half-Kneeling Hip Hinge",
        imageStem: "r1_084_half-kneeling_hip_hinge",
        instructions: [
            "Start in a half-kneeling position with one knee on the floor and the opposite leg extended out to the side, keeping the extended foot flat on the floor.",
            "Hinge forward at your hips, lowering your torso slightly while keeping your back straight and your extended leg straight.",
            "Return to the starting position and repeat the movement dynamically.",
            "Switch sides at the halfway point.",
        ],
        tips: [
            "Engage your core to stabilize your torso and protect your lower back.",
            "Move smoothly and avoid rounding your spine.",
        ],
        modifications: [
            "Place a cushion or folded blanket under your kneeling knee for comfort.",
            "Reduce the depth of the hinge if flexibility is limited.",
            "Perform the movement more slowly to ensure proper form.",
        ],
        benefits: [
            "Groin",
            "Spine",
            "Hips",
            "Quadriceps",
            "Core",
            "Lower Back",
            "Glutes",
        ],
    },
    "Hamstring Pulls": {
        name: "Hamstring Pulls",
        imageStem: "r1_085_hamstring_pulls",
        instructions: [
            "Start lying on your back with your legs extended and your arms at your sides.",
            "Bend one knee and place a strap or towel around the ball of your foot.",
            "Extend your leg towards the ceiling, holding the ends of the strap with both hands.",
            "Gently pull on the strap, bringing your leg closer to your body.",
        ],
        tips: [
            "Keep your bottom leg extended and pressed into the floor.",
            "Keep your extended leg straight and your foot flexed.",
            "Keep your back flat on the floor and your hips grounded.",
        ],
        modifications: [
            "Keep a slight bend in your knee if straightening your leg is uncomfortable.",
        ],
        benefits: [
            "Calves",
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Hamstring Scoops": {
        name: "Hamstring Scoops",
        imageStem: "r1_086_hamstring_scoops",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands resting on your hips.",
            "Step one foot forward, keeping your heel on the floor and your toes pointing up.",
            "Hinge at your hips, lowering your torso towards your front leg.",
            "Return to standing and repeat the movement. Switch sides at the halfway point.",
        ],
        tips: [
            "Keep your back straight and avoid rounding your spine.",
            "Engage your core to maintain balance and stability.",
        ],
        modifications: [
            "Reduce the depth of the hinge if flexibility is limited.",
            "Hold onto a chair or wall for balance if needed.",
            "Perform the exercise more slowly to maintain better control.",
        ],
        benefits: [
            "Calves",
            "Hamstrings",
            "Core",
            "Lower Back",
            "Glutes",
        ],
    },
    "Hand Plank": {
        name: "Hand Plank",
        imageStem: "r1_087_hand_plank",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Step one foot back and then the other, so your legs are fully extended.",
            "Engage your core to keep your body in a straight line from your head to your heels.",
            "Distribute your weight evenly between your hands and feet and hold the position.",
        ],
        tips: [
            "Look at a spot on the floor just ahead of your hands to keep your neck neutral.",
        ],
        modifications: [
            "For less intensity, drop to your knees while maintaining a straight line from knees to head.",
        ],
        benefits: [
            "Triceps",
            "Upper Back",
            "Obliques",
            "Shoulders",
            "Chest",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Hand Plank Leg Lift": {
        name: "Hand Plank Leg Lift",
        imageStem: "r1_088_hand_plank_leg_lift",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Step one foot back and then the other, so your legs are fully extended.",
            "Engage your core to lift one of your legs off the floor, while keeping your body in a straight line.",
            "Distribute your weight evenly between your hands and foot and hold the position.",
        ],
        tips: [
            "Keep your raised leg at hip height or as high as you can while maintaining form.",
            "Focus on keeping your hips level and avoiding rotation.",
        ],
        modifications: [
            "For less intensity, lower your bottom knee to the floor.",
        ],
        benefits: [
            "Triceps",
            "Upper Back",
            "Obliques",
            "Shoulders",
            "Chest",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Hand Side Plank": {
        name: "Hand Side Plank",
        imageStem: "r1_089_hand_side_plank",
        instructions: [
            "Start lying on your side with your legs extended and your feet stacked on top of each other.",
            "Place your bottom hand under your shoulder with your palm flat on the floor.",
            "Straighten your bottom arm and lift your hips off the floor, creating a straight line from your head to your heels.",
            "Lift your top arm toward the ceiling and hold the position.",
        ],
        tips: [
            "Keep your supporting arm directly under your shoulder.",
            "Keep your hips lifted and in line with your body.",
        ],
        modifications: [
            "For less intensity, lower your bottom knee to the floor for support.",
            "If wrist discomfort occurs, perform the plank on your forearm instead.",
        ],
        benefits: [
            "Triceps",
            "Obliques",
            "Shoulders",
            "Abdomen",
        ],
    },
    "Hand Side Plank Leg Lift": {
        name: "Hand Side Plank Leg Lift",
        imageStem: "r1_090_hand_side_plank_leg_lift",
        instructions: [
            "Start lying on your side with your legs extended and your feet stacked on top of each other.",
            "Place your bottom hand under your shoulder with your palm flat on the floor.",
            "Straighten your bottom arm and lift your hips off the floor, creating a straight line from your head to your heels.",
            "Lift your top arm and your top leg toward the ceiling and hold the position.",
        ],
        tips: [
            "Keep your supporting arm directly under your shoulder.",
            "Keep your hips lifted and in line with your body.",
        ],
        modifications: [
            "For less intensity, lower your bottom knee to the floor for support.",
            "If wrist discomfort occurs, perform the plank on your forearm instead.",
        ],
        benefits: [
            "Triceps",
            "Obliques",
            "Shoulders",
            "Glutes",
            "Abdomen",
        ],
    },
    "Happy Baby": {
        name: "Happy Baby",
        imageStem: "r1_091_happy_baby",
        instructions: [
            "Start lying on your back with your knees bent and feet flat on the floor.",
            "Lift your feet off the floor to bring your knees towards your armpits.",
            "Grasp the outer edges of your feet with your hands and gently pull your knees towards the floor.",
        ],
        tips: [
            "Keep your lower back pressed into the floor.",
            "Relax your shoulders and neck.",
        ],
        modifications: [
            "If you can't reach your feet, hold onto your ankles or calves instead.",
        ],
        benefits: [
            "Groin",
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Heel-to-Toe Rocks": {
        name: "Heel-to-Toe Rocks",
        imageStem: "r1_092_heel-to-toe_rocks",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands at your sides.",
            "Shift your weight forward onto your toes, lifting your heels off the floor.",
            "Slowly shift your weight back onto your heels, lifting your toes off the floor.",
            "Continue rocking back and forth in a controlled, smooth motion.",
        ],
        tips: [
            "Engage your core to maintain balance.",
            "Keep your movements steady and avoid abrupt shifts.",
            "Focus on keeping your posture upright throughout the exercise.",
        ],
        modifications: [
            "Hold onto a wall or chair for added balance support.",
            "Reduce the range of motion if the stretch feels too intense.",
            "Perform the movement more slowly for better control.",
        ],
        benefits: [
            "Calves",
            "Feet",
            "Shins",
            "Ankles",
        ],
    },
    "High Knee Twists": {
        name: "High Knee Twists",
        imageStem: "r1_093_high_knee_twists",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands behind your head.",
            "Lift one knee towards your chest while twisting your torso towards the lifted knee.",
            "Lower your leg and return to the starting position before switching sides.",
            "Continue alternating legs in a controlled, dynamic motion.",
        ],
        tips: [
            "Focus on controlled movements rather than speed for better form.",
            "Focus on keeping your torso upright to maintain balance.",
            "Coordinate your twist and knee lift for fluid motion.",
        ],
        modifications: [
            "Reduce the height of the knee lift if flexibility is limited.",
        ],
        benefits: [
            "Obliques",
            "Hips",
            "Core",
        ],
    },
    "High Knees": {
        name: "High Knees",
        imageStem: "r1_094_high_knees",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your elbows bent at 90 degrees, holding your hands out in front of you.",
            "Lift one knee towards your hand, aiming to tap it without moving your arms.",
            "Quickly alternate legs in a running motion, keeping a steady rhythm and your torso upright.",
            "Focus on bringing your knees high enough to reach your hands with each lift.",
        ],
        tips: [
            "Land softly on the balls of your feet to minimize impact on your joints.",
            "Maintain a steady rhythm and controlled movement to keep proper form.",
            "Keep your upper body relaxed and upright.",
        ],
        modifications: [
            "Perform the movement at a slower pace for lower intensity.",
            "Keep your hands lower if flexibility or strength limits the height of your knees.",
        ],
        benefits: [
            "Knees",
            "Calves",
            "Feet",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Core",
            "Ankles",
            "Toes",
            "Glutes",
        ],
    },
    "Hip Bridges": {
        name: "Hip Bridges",
        imageStem: "r1_095_hip_bridges",
        instructions: [
            "Start lying on your back with your knees bent and feet flat on the floor.",
            "Engage your glutes and lift your hips towards the ceiling.",
            "Lower your hips back down to the floor and repeat the movement in a controlled manner.",
        ],
        tips: [
            "Engage your core and glutes to avoid straining your lower back.",
            "Keep your movements smooth and controlled.",
            "Avoid arching your lower back at the top of the movement.",
        ],
        modifications: [
            "Place a cushion under your shoulders for support.",
            "Reduce the range of motion if needed.",
            "Perform the movement more slowly if it feels too challenging.",
        ],
        benefits: [
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Hip Circles": {
        name: "Hip Circles",
        imageStem: "r1_096_hip_circles",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands on your hips.",
            "Gently rotate your hips in a circular motion.",
            "Repeat the movement and switch sides at the halfway point.",
        ],
        tips: [
            "Engage your core to support your lower back.",
            "Keep your knees soft and avoid locking them.",
        ],
        modifications: [
            "Perform smaller circles if the full range of motion is uncomfortable.",
        ],
        benefits: [
            "Hips",
            "Core",
            "Lower Back",
        ],
    },
    "Hollow Body": {
        name: "Hollow Body",
        imageStem: "r1_097_hollow_body",
        instructions: [
            "Start lying on your back with your legs extended and your arms straight above your head.",
            "Engage your core to lift your head, arms, shoulders, and legs off the floor.",
            "Create a \"C\" shape with your body, balancing on your lower back, and hold the position.",
        ],
        tips: [
            "Keep your lower back pressed into the floor.",
            "Keep your legs straight and your feet together.",
        ],
        modifications: [
            "For less intensity, keep your knees bent and your arms in front of you.",
        ],
        benefits: [
            "Shoulders",
            "Hips",
            "Quadriceps",
            "Abdomen",
        ],
    },
    "Humble Warrior": {
        name: "Humble Warrior",
        imageStem: "r1_098_humble_warrior",
        instructions: [
            "Start in a standing lunge position with your hands clasped behind your back.",
            "Open your chest and hinge forward at your hips, bringing your torso inside your front thigh.",
            "Let your head hang down towards the floor, while reaching your clasped hands up and over your back.",
            "Keep your front knee bent and your back leg straight.",
        ],
        tips: [
            "Engage your core to support your lower back and maintain balance.",
            "Keep your shoulders relaxed and avoid rounding your back.",
            "Breathe deeply and evenly, allowing your body to relax into the pose.",
        ],
        modifications: [
            "If clasping your hands behind your back is difficult, use a strap or towel to hold onto.",
            "For less intensity, reduce the depth of the fold or keep your torso more upright.",
            "Use a block or chair under your hands for added support if needed.",
        ],
        benefits: [
            "Neck",
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Chest",
            "Glutes",
        ],
    },
    "Hurdler": {
        name: "Hurdler",
        imageStem: "r1_099_hurdler",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Bend one leg and place the sole of your foot against your opposite inner thigh.",
            "Sit tall and lengthen your spine, then lean forward from your hips to reach out and grab your extended foot.",
        ],
        tips: [
            "Focus on hinging at the hips rather than rounding your back.",
            "Keep your extended leg straight and your foot flexed, but be careful not to lock your knees.",
        ],
        modifications: [
            "If you can't reach your foot, use a yoga strap or towel looped around your foot.",
            "For less intensity, bend your extended leg slightly.",
        ],
        benefits: [
            "Groin",
            "Calves",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Jump Squats": {
        name: "Jump Squats",
        imageStem: "r2_001_jump_squats",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Lower into a squat by bending your knees and pushing your hips back.",
            "Jump upwards and land softly by bending your knees to absorb the impact.",
            "Immediately lower into the next squat and repeat the movement.",
        ],
        tips: [
            "Keep your knees aligned with your toes to avoid strain.",
            "Engage your core to stabilize your body during the jump.",
            "Focus on landing lightly to reduce stress on your joints.",
        ],
        modifications: [
            "Perform regular air squats without jumping if jumping is too intense, or use a smaller jump to reduce impact.",
        ],
        benefits: [
            "Calves",
            "Quadriceps",
            "Core",
            "Glutes",
        ],
    },
    "Jumping Jacks": {
        name: "Jumping Jacks",
        imageStem: "r2_002_jumping_jacks",
        instructions: [
            "Start from a standing position with your feet together and your arms at your sides.",
            "Jump your feet out to the sides while simultaneously raising your arms above your head.",
            "After completing the movement, quickly jump back to the starting position, bringing your back together and lowering your arms.",
            "Repeat the movement in a smooth, continuous motion.",
        ],
        tips: [
            "Keep a slight bend in your knees and land softly on the balls of your feet to absorb the impact of each jump.",
        ],
        modifications: [
            "If raising your arms is difficult, keep your hands on your hips.",
        ],
        benefits: [
            "Calves",
            "Upper Back",
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Lower Back",
            "Abdomen",
        ],
    },
    "Kang Squat": {
        name: "Kang Squat",
        imageStem: "r2_003_kang_squat",
        instructions: [
            "Start from a standing position with your feet shoulder-width apart and your toes pointed slightly outward.",
            "Place your hands behind your head or folded in front of your chest.",
            "Hinge at your hips, lowering your torso forward while keeping your back straight, until your torso is nearly parallel to the floor.",
            "Transition into a full squat by bending your knees and lowering your hips while maintaining an upright torso.",
            "Reverse the movement by returning to the hinge position and then standing upright.",
        ],
        tips: [
            "Engage your core to stabilize your torso throughout the movement.",
            "Keep your heels firmly planted on the floor and your knees aligned with your toes.",
            "Move slowly and with control to ensure proper form through the hinge and squat phases.",
        ],
        modifications: [
            "Reduce the depth of the squat if flexibility or strength is limited.",
        ],
        benefits: [
            "Hamstrings",
            "Core",
            "Glutes",
        ],
    },
    "Knee Circles": {
        name: "Knee Circles",
        imageStem: "r2_004_knee_circles",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands on your knees.",
            "Bend your knees slightly and make small circles with your knees, moving them together in a circular motion.",
            "Reverse the movement at the halfway point.",
        ],
        tips: [
            "Keep your movements smooth and controlled to avoid straining your knees.",
        ],
        modifications: [
            "Perform the exercise at a slower pace if needed to maintain control.",
        ],
        benefits: [
            "Knees",
            "Calves",
            "Feet",
            "Shins",
            "Ankles",
        ],
    },
    "Knee Push-Ups": {
        name: "Knee Push-Ups",
        imageStem: "r2_005_knee_push-ups",
        instructions: [
            "Start in a plank position on your hands and knees, with your hands placed slightly wider than shoulder-width apart.",
            "Keep your body in a straight line from your head to your knees.",
            "Engage your core and keep your elbows close to your body as you lower your chest towards the floor.",
            "Push through your palms to return to the starting position, fully extending your arms.",
        ],
        tips: [
            "Avoid letting your hips sag or lift too high.",
            "Keep your gaze slightly forward to maintain a neutral neck position.",
            "Engage your glutes and core to support your lower back.",
            "Breathe deeply, inhaling as you lower and exhaling as you push up.",
        ],
        modifications: [
            "If lowering fully is challenging, perform smaller push-up motions and gradually increase your range of motion.",
            "For added comfort, place a cushion or folded blanket under your knees.",
            "If additional support is needed, perform knee push-ups with your hands on an elevated surface like a bench or countertop.",
        ],
        benefits: [
            "Triceps",
            "Shoulders",
            "Chest",
        ],
    },
    "Knee-to-Wall": {
        name: "Knee-to-Wall",
        imageStem: "r2_006_knee-to-wall",
        instructions: [
            "Start on one knee with your front foot a hand's-length from a wall.",
            "Keeping your front heel flat on the floor, bring your knee forward to touch the wall.",
        ],
        tips: [
            "Continue to move your foot further away from the wall to deepen the stretch.",
        ],
        modifications: [
            "Place your hands on your knee or on the wall in front of you for support.",
            "If you can't touch your knee to the wall, move your foot closer.",
        ],
        benefits: [
            "Calves",
            "Feet",
            "Ankles",
        ],
    },
    "Kneeling Hip Circles": {
        name: "Kneeling Hip Circles",
        imageStem: "r2_007_kneeling_hip_circles",
        instructions: [
            "Start in a tabletop position, with your hands under your shoulders and your knees under your hips.",
            "Lift one knee off the floor, keeping it bent at 90 degrees, and slowly move it in a circular motion.",
            "Switch sides at the halfway point.",
        ],
        tips: [
            "Try to rotate your hip through its full range of motion.",
            "Move slowly and with control, focusing on isolating the movement in your hip joint.",
            "Engage your core to stabilize your torso and prevent lower back arching.",
        ],
        modifications: [
            "Reduce the range of motion if flexibility or strength is limited.",
        ],
        benefits: [
            "Hips",
            "Core",
            "Glutes",
        ],
    },
    "Kneeling Hip Hinge": {
        name: "Kneeling Hip Hinge",
        imageStem: "r2_008_kneeling_hip_hinge",
        instructions: [
            "Start in a kneeling position with your knees hip-width apart and your torso upright.",
            "Place your hands on your hips and hinge forward at your hips, bringing your torso toward the floor while keeping your back straight.",
            "Return to the upright position in a controlled manner and repeat the movement dynamically.",
        ],
        tips: [
            "Focus on hinging at the hips rather than bending your lower back.",
            "Engage your core to stabilize your torso and protect your lower back.",
        ],
        modifications: [
            "Place a cushion or folded blanket under your knees for added comfort.",
            "Reduce the depth of the hinge if flexibility or strength is limited.",
            "Perform the movement more slowly to focus on maintaining proper form.",
        ],
        benefits: [
            "Spine",
            "Hips",
            "Quadriceps",
            "Core",
            "Lower Back",
            "Glutes",
        ],
    },
    "Kneeling Psoas": {
        name: "Kneeling Psoas",
        imageStem: "r2_009_kneeling_psoas",
        instructions: [
            "Start from a kneeling position with your knees hip-width apart and your arms at your sides.",
            "Step forward with one leg to place your foot on the floor in front of you, forming a 90-degree angle with both knees.",
            "Raise your opposite arm above your head and place your other hand on your hip.",
            "Press your hips forward while reaching up and over with your raised arm.",
        ],
        tips: [
            "Align your front knee directly above your ankle.",
        ],
        modifications: [
            "If you have knee pain, place a cushion under your back knee for support.",
        ],
        benefits: [
            "Psoas",
            "IT Band",
            "Obliques",
            "Hips",
            "Quadriceps",
            "Lower Back",
            "Lats",
        ],
    },
    "Kneeling Quad": {
        name: "Kneeling Quad",
        imageStem: "r2_010_kneeling_quad",
        instructions: [
            "Start from a kneeling position with your knees hip-width apart and the tops of your feet on the floor.",
            "Step one foot forward and bring your opposite foot up towards your glutes.",
            "Please one hand on your front knee and reach back with your other hand to grab your ankle.",
            "Gently push your hips forward and pull your heel closer to your glutes.",
        ],
        tips: [
            "Maintain an upright posture, avoiding leaning forward or backward.",
        ],
        modifications: [
            "If reaching your back foot is difficult, keep your foot on the floor.",
        ],
        benefits: [
            "Psoas",
            "Hips",
            "Quadriceps",
            "Abdomen",
        ],
    },
    "Kneeling Scapular Push-Ups": {
        name: "Kneeling Scapular Push-Ups",
        imageStem: "r2_011_kneeling_scapular_push-ups",
        instructions: [
            "Start kneeling on the floor with your hands placed under your shoulders and your knees under your hips.",
            "Keep your arms straight and slowly lower your chest slightly by retracting your shoulder blades together.",
            "Push through your hands to return to the starting position by protracting your shoulder blades.",
            "Repeat the movement dynamically in a controlled rhythm.",
        ],
        tips: [
            "Focus on isolating the movement in your shoulder blades rather than bending your elbows.",
            "Keep your neck neutral and avoid shrugging your shoulders.",
            "Move steadily and avoid using momentum to complete the movement.",
        ],
        modifications: [],
        benefits: [
            "Shoulders",
            "Chest",
        ],
    },
    "Kneeling Wrist Extension Circles": {
        name: "Kneeling Wrist Extension Circles",
        imageStem: "r2_012_kneeling_wrist_extension_circles",
        instructions: [
            "Start kneeling on the floor with your hands placed under your shoulders, fingers pointing towards your knees.",
            "Keep your hands firmly pressed into the floor, shift your weight to form a circular motion with your shoulders.",
            "Complete several circles in one direction, then reverse the direction.",
        ],
        tips: [
            "Move slowly and with control to avoid straining your wrists.",
            "Engage your core to prevent unnecessary pressure on your wrists.",
        ],
        modifications: [
            "Perform smaller circles if the full range of motion feels uncomfortable.",
            "If wrist discomfort occurs, reduce the pressure by shifting your weight slightly back.",
        ],
        benefits: [
            "Forearms",
            "Shoulders",
            "Wrists",
            "Hands",
        ],
    },
    "Knees Hugs": {
        name: "Knees Hugs",
        imageStem: "r2_013_knees_hugs",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms resting at your sides.",
            "Shift your weight onto one foot and lift the opposite knee towards your chest.",
            "Grasp your knee with both hands and pull it closer to your chest.",
            "Hold the position briefly, then lower your leg and repeat on the other side.",
        ],
        tips: [
            "Keep your standing leg slightly bent to maintain balance.",
            "Hold your back straight and your chest up.",
        ],
        modifications: [
            "If balancing is difficult, perform the stretch near a wall or chair for support.",
            "If lifting your knee to your chest is too intense, lift it to a comfortable height.",
        ],
        benefits: [
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Knees-to-chest": {
        name: "Knees-to-chest",
        imageStem: "r2_014_knees-to-chest",
        instructions: [
            "Start lying on your back with your legs extended and your arms at your sides.",
            "Bend your knees and draw them towards your chest.",
            "Wrap your arms around your shins and gently pull them closer to your chest.",
        ],
        tips: [
            "Relax your head and neck on the floor.",
            "Keep your lower back pressed into the floor.",
        ],
        modifications: [
            "If you can't reach your shins, wrap your arms behind your thighs.",
        ],
        benefits: [
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Lateral Foot Rocks": {
        name: "Lateral Foot Rocks",
        imageStem: "r2_015_lateral_foot_rocks",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands at your sides.",
            "Shift your weight onto the outer edges of your feet, lifting the inner edges.",
            "Slowly shift your weight onto the inner edges of your feet, lifting the outer edges.",
            "Continue rocking side to side in a controlled and steady motion.",
        ],
        tips: [
            "Engage your core to help with balance.",
            "Move smoothly to avoid jerking motions.",
            "Keep your knees slightly bent and relaxed.",
        ],
        modifications: [
            "Use a wall or chair for extra balance support.",
            "Perform smaller lateral movements if a full range feels uncomfortable.",
            "Do the exercise seated if standing is challenging.",
        ],
        benefits: [
            "Calves",
            "Feet",
            "Ankles",
        ],
    },
    "Lateral Leg Swing": {
        name: "Lateral Leg Swing",
        imageStem: "r2_016_lateral_leg_swing",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands on your hips.",
            "Shift your weight onto one leg and lift your opposite leg slightly off the floor.",
            "Swing your lifted leg out to the side, then across your body in front of your standing leg.",
            "Repeat the movement in a controlled, continuous motion.",
        ],
        tips: [
            "Keep your standing leg active with a slight bend in your knee.",
            "Keep your upper body stable; the movement should come from your hip.",
            "Start with smaller swings and gradually increase the range of motion.",
        ],
        modifications: [
            "Place your hand on a wall or chair for additional support.",
        ],
        benefits: [
            "Groin",
            "IT Band",
            "Hips",
        ],
    },
    "Lateral Lunge": {
        name: "Lateral Lunge",
        imageStem: "r2_017_lateral_lunge",
        instructions: [
            "Start from a standing position with your feet wide apart and your hands together in front of you.",
            "Bend one knee and lower your hips to that side, while keeping your other leg straight and your toes pointed forward.",
            "Push back to the starting position and repeat on the other side.",
        ],
        tips: [
            "Keep your chest lifted and your back straight.",
            "Move smoothly and with control to maintain balance.",
        ],
        modifications: [
            "If the lunge is too intense, don't lower your hips as much.",
            "Use a chair or wall for balance support if needed.",
        ],
        benefits: [
            "Groin",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Leaning 90/90": {
        name: "Leaning 90/90",
        imageStem: "r2_018_leaning_90-90",
        instructions: [
            "Start on the floor in a seated position with your knees bent and your feet flat on the floor.",
            "Let your knees fall to one side so that both knees form 90-degree angles against the floor.",
            "Place your hands on the floor behind you for support and lean back, keeping your hips and shoulders square.",
        ],
        tips: [
            "Keep your back straight and avoid rounding your spine.",
        ],
        modifications: [
            "For less intensity, sit on a cushion or folded blanket to raise your hips.",
        ],
        benefits: [
            "Knees",
            "Groin",
            "Hips",
            "Glutes",
        ],
    },
    "Leaning Calf": {
        name: "Leaning Calf",
        imageStem: "r2_019_leaning_calf",
        instructions: [
            "Start from a standing position facing a wall, about an arm's length away.",
            "Place your hands on the wall at shoulder height and shoulder-width apart.",
            "Step one foot back, keeping your toes pointing forward and your heel on the ground.",
            "Bend your front knee while keeping your back leg straight and push into the wall to deepen the stretch.",
        ],
        tips: [],
        modifications: [
            "If the stretch is too intense, move your back foot slightly closer to the wall.",
        ],
        benefits: [
            "Calves",
            "Feet",
            "Hamstrings",
            "Ankles",
        ],
    },
    "Leaning Figure Four": {
        name: "Leaning Figure Four",
        imageStem: "r2_020_leaning_figure_four",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you and your hands behind you for support.",
            "Lift one leg and cross your ankle over your opposite thigh, just above the knee.",
            "Slide your bottom foot toward your body so your knee is bent and your foot is flat on the floor.",
        ],
        tips: [
            "Keep your arms straight and lift your chest to open your shoulders.",
        ],
        modifications: [],
        benefits: [
            "IT Band",
            "Hips",
            "Lower Back",
            "Glutes",
        ],
    },
    "Leg Lift": {
        name: "Leg Lift",
        imageStem: "r2_021_leg_lift",
        instructions: [
            "Start lying on your back with your legs extended and your arms behind your head.",
            "Engage your core to lift both legs off the floor, creating a 45 degree angle between your legs and the floor.",
            "Keep your legs straight and your feet together and hold the position.",
        ],
        tips: [
            "Keep your lower back pressed into the floor.",
            "Keep your head and shoulders flat on the floor throughout the exercise.",
        ],
        modifications: [
            "If lifting both legs is too intense, perform the exercise with one leg at a time.",
            "If you feel strain in your lower back, place your hands under your hips for support or bend your knees slightly.",
        ],
        benefits: [
            "Hips",
            "Quadriceps",
            "Abdomen",
        ],
    },
    "Leg Raises": {
        name: "Leg Raises",
        imageStem: "r2_022_leg_raises",
        instructions: [
            "Start lying on your back with your legs extended and arms at your sides.",
            "Engage your core and lift both legs towards the ceiling, keeping them straight.",
            "Lower your legs with control until they are just above the floor.",
            "Repeat the movement, keeping your core tight throughout.",
        ],
        tips: [
            "Engage your core to prevent arching your lower back.",
            "Move slowly and with control to avoid momentum taking over.",
            "Breathe steadily, exhaling as you lift and inhaling as you lower.",
        ],
        modifications: [
            "If keeping your legs straight is difficult, perform the movement with slightly bent knees.",
            "Place your hands under your hips for extra lower back support.",
            "If the exercise is too intense, reduce the range of motion by not lowering your legs as far.",
        ],
        benefits: [
            "Obliques",
            "Hips",
            "Abdomen",
        ],
    },
    "Leg Swings": {
        name: "Leg Swings",
        imageStem: "r2_023_leg_swings",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands on your hips.",
            "Shift your weight onto one leg and lift your opposite leg slightly off the floor.",
            "Swing your lifted leg forward and backward in a controlled, continuous motion.",
        ],
        tips: [
            "Keep your standing leg active with a slight bend in your knee.",
            "Keep your upper body stable; the movement should come from your hip.",
            "Start with smaller swings and gradually increase the range of motion.",
        ],
        modifications: [
            "Place your hand on a wall or chair for additional support.",
        ],
        benefits: [
            "Groin",
            "Calves",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Legs-up-wall": {
        name: "Legs-up-wall",
        imageStem: "r2_024_legs-up-wall",
        instructions: [
            "Starting on the floor in a seated position with the side of your hip touching the wall.",
            "Lie back and swing your legs up onto the wall in one motion.",
            "Scoot your hips as close to the wall as comfortable and extend your legs straight up the wall.",
            "Rest your arms by your sides with your palms facing up.",
        ],
        tips: [
            "Keep your legs relatively relaxed and avoid locking your knees.",
        ],
        modifications: [
            "If your hamstrings are tight, move your hips slightly away from the wall.",
            "Place a cushion or folded blanket under your hips for extra support.",
        ],
        benefits: [
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Lizard Pose": {
        name: "Lizard Pose",
        imageStem: "r2_025_lizard_pose",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Step one foot forward, placing it outside your hand, and lower your hips towards the floor.",
            "Extend your back leg straight behind you, keeping your knee and the top of your foot on the floor.",
        ],
        tips: [
            "Keep your chest lifted and your back straight.",
            "Relax your hips and allow them to sink towards the floor.",
            "For a deeper stretch, lift your back knee and lower your forearms to the floor.",
        ],
        modifications: [],
        benefits: [
            "Groin",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Locust Pose": {
        name: "Locust Pose",
        imageStem: "r2_026_locust_pose",
        instructions: [
            "Start lying on your stomach with your legs extended and your arms at your sides.",
            "Engage your back, glutes, and core to lift your chest, arms, and legs off the ground.",
            "Keep your legs straight and together and point your toes.",
            "Gaze slightly forward and keep your neck in line with your spine.",
        ],
        tips: [],
        modifications: [
            "For less intensity, lift only your upper body or only your legs.",
        ],
        benefits: [
            "Neck",
            "Upper Back",
            "Lower Back",
            "Glutes",
        ],
    },
    "Lunge": {
        name: "Lunge",
        imageStem: "r2_027_lunge",
        instructions: [
            "Start from a kneeling position with your arms at your sides.",
            "Step forward with one leg, placing your foot flat on the floor in front of you.",
            "Push your hips forward and raise your arms overhead.",
            "Lift your chest and reach toward the ceiling.",
        ],
        tips: [
            "Keep your front knee stable and align it directly above your ankle.",
            "Engage your back leg, pressing the top of your foot into the floor.",
            "Keep your torso upright and avoid arching your lower back.",
        ],
        modifications: [
            "For less intensity, keep your hands on your front thigh.",
            "Place a towel or cushion under your back knee for support.",
            "Hold onto a wall or chair for balance if needed.",
        ],
        benefits: [
            "Psoas",
            "Hips",
            "Quadriceps",
            "Lower Back",
            "Abdomen",
        ],
    },
    "Lying Ankle Circles": {
        name: "Lying Ankle Circles",
        imageStem: "r2_028_lying_ankle_circles",
        instructions: [
            "Start lying on your back with your legs extended and your arms at your sides.",
            "Bend one knee and draw it towards your chest, then hold your thigh with both hands.",
            "Rotate your foot in a circular motion, changing directions every few rotations.",
        ],
        tips: [
            "Focus on moving only your ankle joint.",
            "Keep the rest of your body relaxed, particularly your hip and knee.",
            "Try to make smooth, controlled circles.",
        ],
        modifications: [
            "For less intensity, perform the exercise with your leg resting on the floor.",
        ],
        benefits: [
            "Feet",
            "Ankles",
        ],
    },
    "Lying Figure Four": {
        name: "Lying Figure Four",
        imageStem: "r2_029_lying_figure_four",
        instructions: [
            "Start lying on your back with your knees bent and feet flat on the floor.",
            "Cross one ankle over the opposite thigh, just above the knee.",
            "Lift your bottom leg off the floor, bringing your knee towards your chest.",
            "Reach forward and clasp your hands behind the thigh of your bottom leg.",
            "Gently pull your leg towards your chest.",
        ],
        tips: [
            "Keep your head and shoulders relaxed on the floor.",
            "Keep your lower back pressed into the floor.",
        ],
        modifications: [
            "If reaching behind your thigh is difficult, use a strap or towel to assist.",
            "For a gentler stretch, keep your bottom foot on the floor.",
        ],
        benefits: [
            "IT Band",
            "Hips",
            "Lower Back",
            "Glutes",
        ],
    },
    "Lying Hamstring": {
        name: "Lying Hamstring",
        imageStem: "r2_030_lying_hamstring",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Lift one leg straight up towards the ceiling while keeping your other foot flat on the floor.",
            "Place your hands behind the thigh or calf of your raised leg and gently pull it towards your chest.",
        ],
        tips: [
            "Keep your hips and lower back pressed into the floor.",
            "Maintain a slight bend in the knee of your raised leg to avoid hyperextension.",
        ],
        modifications: [
            "Use a yoga strap or towel looped around your foot if you can't reach your leg.",
        ],
        benefits: [
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Lying Open Book": {
        name: "Lying Open Book",
        imageStem: "r2_031_lying_open_book",
        instructions: [
            "Start lying on your side with your legs bent at a 90-degree angle and your arms extended in front of you, palms together.",
            "Open your top arm, rotating your torso and reaching it towards the floor behind you.",
            "Return to the starting position and repeat dynamically.",
            "Switch sides at the halfway point.",
        ],
        tips: [
            "Move slowly to avoid straining your shoulders or back.",
            "Focus on keeping your lower body stable while your torso rotates.",
            "Breathe deeply, exhaling as you open and inhaling as you return.",
        ],
        modifications: [
            "Reduce the range of motion if flexibility is limited.",
        ],
        benefits: [
            "Spine",
            "Obliques",
            "Shoulders",
            "Chest",
        ],
    },
    "Lying Quad Stretch": {
        name: "Lying Quad Stretch",
        imageStem: "r2_032_lying_quad_stretch",
        instructions: [
            "Start lying on your side with your legs extended and your feet stacked on top of each other.",
            "Bend your top knee to bring your heel towards your glutes, holding your ankle with your hand.",
            "Pull your heel closer to your glutes while keeping your thighs aligned.",
        ],
        tips: [
            "Push your hips forward slightly to deepen the stretch.",
            "Keep a slight bend in your bottom leg for added stability.",
        ],
        modifications: [
            "If reaching your ankle is difficult, use a strap or towel looped around your foot for assistance.",
        ],
        benefits: [
            "Knees",
            "Shins",
            "Hips",
            "Quadriceps",
            "Ankles",
        ],
    },
    "Lying Side Leg Raise": {
        name: "Lying Side Leg Raise",
        imageStem: "r2_033_lying_side_leg_raise",
        instructions: [
            "Start lying on your side with your legs extended and your feet stacked on top of each other.",
            "Rest your head on your lower arm and place your top hand on your hip.",
            "Engage your core to lift your top leg towards the ceiling, creating a 45 degree angle between your leg and the floor.",
            "Hold the position.",
        ],
        tips: [
            "Keep your hips stable and your body in a straight line from head to toe.",
        ],
        modifications: [
            "If lifting your leg high is too challenging, perform the exercise with a smaller range of motion.",
        ],
        benefits: [
            "Obliques",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Modified Reverse Prayer": {
        name: "Modified Reverse Prayer",
        imageStem: "r2_034_modified_reverse_prayer",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms at your sides.",
            "Bend both arms to bring your hands behind your back, then grab your opposite elbows with your hands.",
            "Lift your chest and keep your back straight.",
        ],
        tips: [
            "Keep your shoulders relaxed and away from your ears.",
            "Avoid arching your back excessively.",
        ],
        modifications: [
            "If holding opposite elbows is too difficult, hold onto your forearms or wrists instead.",
        ],
        benefits: [
            "Shoulders",
            "Chest",
        ],
    },
    "Modified Seated Twist": {
        name: "Modified Seated Twist",
        imageStem: "r2_035_modified_seated_twist",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Cross one leg over the other, placing your foot on the floor outside of your opposite thigh, then bend your bottom knee to bring your foot toward your opposite hip.",
            "Rotate your torso and place your elbow on the outside of your top knee and your other hand behind you for support.",
            "Continue to rotate your torso and turn your head to look behind you.",
        ],
        tips: [
            "Lengthen your spine and keep your back straight.",
        ],
        modifications: [],
        benefits: [
            "Spine",
            "IT Band",
            "Hips",
            "Lower Back",
            "Glutes",
        ],
    },
    "Mountain Climbers": {
        name: "Mountain Climbers",
        imageStem: "r2_036_mountain_climbers",
        instructions: [
            "Start in a plank position with your palms on the floor under your shoulders and your body in a straight line.",
            "Engage your core and bring one knee towards your chest.",
            "Quickly switch legs, alternating in a running motion.",
            "Keep your hips low and your movements controlled.",
        ],
        tips: [
            "Engage your core to prevent your hips from sagging.",
            "Keep your shoulders stacked over your wrists.",
        ],
        modifications: [
            "Perform the movement more slowly to reduce intensity.",
            "Keep one foot on the floor at all times for a modified version.",
            "Place your hands on an elevated surface like a bench for added support.",
        ],
        benefits: [
            "Triceps",
            "Obliques",
            "Shoulders",
            "Hips",
            "Abdomen",
        ],
    },
    "Narrow Push Up Hold": {
        name: "Narrow Push Up Hold",
        imageStem: "r2_037_narrow_push_up_hold",
        instructions: [
            "Start on the floor in a push-up position with your hands shoulder-width apart.",
            "Lower your body halfway down, keeping your elbows close to your sides.",
            "Distribute your weight evenly between your hands and feet and hold the position.",
        ],
        tips: [
            "Avoid letting your hips drop or rise too high.",
        ],
        modifications: [
            "If holding the position is too intense, lower your knees to the floor.",
        ],
        benefits: [
            "Triceps",
            "Shoulders",
            "Chest",
        ],
    },
    "Narrow Squat Hold": {
        name: "Narrow Squat Hold",
        imageStem: "r2_038_narrow_squat_hold",
        instructions: [
            "Start from a standing position with your feet together.",
            "Lower your hips back and down as if sitting into a chair, keeping your weight on your heels.",
            "Keep your chest lifted and your back straight and hold the position.",
        ],
        tips: [
            "Aim to lower your hips until your thighs are parallel to the floor.",
            "Keep your knees in line with your toes.",
        ],
        modifications: [
            "For less intensity, perform the exercise with a smaller range of motion.",
        ],
        benefits: [
            "Calves",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Neck Extension": {
        name: "Neck Extension",
        imageStem: "r2_039_neck_extension",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms at your sides.",
            "Slowly tilt your head back, lifting your chin towards the ceiling.",
            "Place your fingertips under your chin and gently push your head further back.",
        ],
        tips: [
            "Keep your mouth closed and your jaw relaxed.",
            "Keep your back straight and your shoulders down.",
        ],
        modifications: [],
        benefits: [
            "Neck",
        ],
    },
    "Neck Flex": {
        name: "Neck Flex",
        imageStem: "r2_040_neck_flex",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms at your sides.",
            "Slowly tilt your head backward, bringing your gaze towards the ceiling.",
            "At the halfway point, switch directions and slowly lower your chin towards your chest.",
        ],
        tips: [
            "Keep your shoulders down and relaxed as you hold each position.",
            "Move slowly and gently to avoid straining your neck.",
        ],
        modifications: [
            "If you have neck pain, limit the range of motion to a comfortable level.",
            "If you experience any discomfort or dizziness, stop the exercise immediately.",
        ],
        benefits: [
            "Spine",
            "Neck",
            "Upper Back",
            "Shoulders",
        ],
    },
    "Neck Flexion": {
        name: "Neck Flexion",
        imageStem: "r2_041_neck_flexion",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms at your sides.",
            "Slowly tilt your head forward, bringing your chin towards your chest.",
            "Interlace your fingers behind your head and gently pull your head further down.",
        ],
        tips: [
            "Keep your back straight and your shoulders relaxed.",
            "Avoid rounding your upper back.",
        ],
        modifications: [],
        benefits: [
            "Neck",
            "Upper Back",
        ],
    },
    "Neck Laterals": {
        name: "Neck Laterals",
        imageStem: "r2_042_neck_laterals",
        instructions: [
            "Start from a seated position with your back straight and your shoulders relaxed.",
            "Place one hand on the side of the chair for support and tilt your head to the side to lower your ear towards your shoulder.",
            "Use your other hand to apply gentle pressure to the side of your head.",
            "Switch sides at the halfway point.",
        ],
        tips: [
            "Keep your shoulders relaxed and avoid hunching them.",
        ],
        modifications: [
            "For less intensity, tilt your head without using your hand.",
        ],
        benefits: [
            "Neck",
            "Upper Back",
        ],
    },
    "Neck Laterals (Standing)": {
        name: "Neck Laterals (Standing)",
        imageStem: "r2_043_neck_laterals",
        instructions: [
            "Start from a standing position with your back straight and your shoulders relaxed.",
            "Tilt your head to the side to lower your ear towards your shoulder.",
            "Use your other hand to apply gentle pressure to the side of your head.",
            "Switch sides at the halfway point.",
        ],
        tips: [
            "Keep your shoulders relaxed and avoid hunching them.",
        ],
        modifications: [
            "For less intensity, tilt your head without using your hand.",
        ],
        benefits: [
            "Neck",
            "Upper Back",
        ],
    },
    "Neck Roll": {
        name: "Neck Roll",
        imageStem: "r2_044_neck_roll",
        instructions: [
            "Start from a seated position with your back straight and your shoulder relaxed.",
            "Tuck your chin down towards your chest and gently roll your neck to the right, bringing your right ear towards your right shoulder.",
            "Roll your chin back down towards your chest and then roll your neck to the left, bringing your left ear towards your left shoulder.",
            "Repeat this back and forth in a slow, continuous motion.",
        ],
        tips: [
            "Move slowly and gently to avoid strain or dizziness.",
            "Minimize your risk of injury by avoiding full neck circles.",
        ],
        modifications: [
            "If you have neck pain, limit your range of motion to a comfortable level.",
        ],
        benefits: [
            "Spine",
            "Neck",
            "Upper Back",
            "Shoulders",
        ],
    },
    "Neck Rotation": {
        name: "Neck Rotation",
        imageStem: "r2_045_neck_rotation",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms at your sides.",
            "Slowly turn your head to one side, looking over your shoulder.",
            "Place your fingertips on the side of your chin and gently push your head further.",
        ],
        tips: [
            "Keep your head level throughout the rotation; don't tilt it up or down.",
            "Keep your back straight and your shoulders relaxed.",
        ],
        modifications: [],
        benefits: [
            "Neck",
        ],
    },
    "One Arm Hug": {
        name: "One Arm Hug",
        imageStem: "r2_046_one_arm_hug",
        instructions: [
            "Start from a seated position with your back straight and your arms resting at your sides.",
            "Extend one arm across your body, bringing it towards the opposite shoulder.",
            "Hook your other arm around your extended arm to pull it closer to your chest.",
        ],
        tips: [
            "Maintain an upright posture and avoid leaning to either side.",
            "Keep your extended arm relaxed.",
        ],
        modifications: [
            "For a gentler stretch, lower your extended arm to your abdomen and pull it with your other hand.",
        ],
        benefits: [
            "Triceps",
            "Shoulders",
            "Lats",
        ],
    },
    "One Arm Hug (Standing)": {
        name: "One Arm Hug (Standing)",
        imageStem: "r2_047_one_arm_hug",
        instructions: [
            "Start from a standing position with your back straight and your arms resting at your sides.",
            "Extend one arm across your body, bringing it towards the opposite shoulder.",
            "Hook your other arm around your extended arm to pull it closer to your chest.",
        ],
        tips: [
            "Maintain an upright posture and avoid leaning to either side.",
            "Keep your extended arm relaxed.",
        ],
        modifications: [
            "For a gentler stretch, lower your extended arm to your abdomen and pull it with your other hand.",
        ],
        benefits: [
            "Triceps",
            "Shoulders",
            "Lats",
        ],
    },
    "Overhead Reach": {
        name: "Overhead Reach",
        imageStem: "r2_048_overhead_reach",
        instructions: [
            "Start from a seated position with your back straight and your arms resting at your sides.",
            "Slowly sweep your arms out and up over your head, interlacing your fingers with your palms facing up.",
            "Reach up towards the ceiling, straightening your elbows and relaxing your shoulders downward.",
        ],
        tips: [
            "Focus on lengthening your spine and creating space between your vertebrae.",
        ],
        modifications: [
            "If interlacing your fingers is uncomfortable, keep your hands shoulder-width apart.",
            "For a deeper stretch, gently lean to one side and then the other while reaching overhead.",
        ],
        benefits: [
            "Spine",
            "Neck",
            "Shoulders",
        ],
    },
    "Overhead Tricep": {
        name: "Overhead Tricep",
        imageStem: "r2_049_overhead_tricep",
        instructions: [
            "Start from a seated position with your back straight and your arms resting at your sides.",
            "Raise one arm overhead and bend your elbow, bringing your hand towards the opposite shoulder blade.",
            "Use your opposite hand to gently press your elbow down towards the middle of your back",
        ],
        tips: [],
        modifications: [],
        benefits: [
            "Triceps",
            "Upper Back",
            "Obliques",
            "Shoulders",
            "Chest",
            "Lower Back",
            "Lats",
        ],
    },
    "Overhead Tricep (Standing)": {
        name: "Overhead Tricep (Standing)",
        imageStem: "r2_050_overhead_tricep",
        instructions: [
            "Start from a standing position with your back straight and your arms resting at your sides.",
            "Raise one arm overhead and bend your elbow, bringing your hand towards the opposite shoulder blade.",
            "Use your opposite hand to gently press your elbow down towards the middle of your back",
        ],
        tips: [],
        modifications: [],
        benefits: [
            "Triceps",
            "Upper Back",
            "Obliques",
            "Shoulders",
            "Chest",
            "Lower Back",
            "Lats",
        ],
    },
    "Pancake Stretch": {
        name: "Pancake Stretch",
        imageStem: "r2_051_pancake_stretch",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Open your legs wide apart and place your hands on the floor in front of you.",
            "Sit up tall to lengthen your spine, then hinge at your hips to reach forward with your hands and lower your upper body towards the floor.",
        ],
        tips: [
            "Keep your back straight and avoid rounding your spine.",
            "Flex your feet and keep your toes pointing upward.",
        ],
        modifications: [
            "If reaching forward is difficult, rest your hands on blocks or a chair in front of you.",
            "Sit on a folded blanket to raise your hips and improve comfort.",
        ],
        benefits: [
            "Groin",
            "Calves",
            "Hips",
            "Hamstrings",
            "Lower Back",
        ],
    },
    "Peaceful Warrior": {
        name: "Peaceful Warrior",
        imageStem: "r2_052_peaceful_warrior",
        instructions: [
            "Start in a standing lunge position with both arms out to the sides at shoulder height.",
            "Lift your front arm up towards the ceiling, while lowering your back arm down towards your back leg.",
            "Gently arch your torso back, keeping your front knee bent and your back leg straight, and look upward or towards your raised hand.",
        ],
        tips: [
            "Keep your front knee aligned with your toes to avoid straining your knee.",
            "Engage your core to support your lower back as you arch.",
        ],
        modifications: [
            "If reaching your back arm down is uncomfortable, rest your hand on your hip or the back of your thigh.",
            "For less intensity, reduce the backbend or keep your torso more upright.",
            "Use a block or place your back hand lightly on a chair for support if needed.",
        ],
        benefits: [
            "Obliques",
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Chest",
            "Lats",
        ],
    },
    "Pelvic Tilt Press": {
        name: "Pelvic Tilt Press",
        imageStem: "r2_053_pelvic_tilt_press",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Engage your core to tilt your pelvis up and press your lower back into the floor.",
            "Keep your arms at your sides with your palms on the floor and hold the position.",
        ],
        tips: [
            "Imagine drawing your navel down towards your spine.",
            "Keep your glutes relaxed; the movement should come from your core.",
        ],
        modifications: [
            "If it's uncomfortable to lie on the floor, perform the exercise against a wall.",
        ],
        benefits: [
            "Lower Back",
        ],
    },
    "Pigeon": {
        name: "Pigeon",
        imageStem: "r2_054_pigeon",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Bring one knee forward and place it behind your wrist on the same side, then slide your ankle towards your opposite hip.",
            "Extend your other leg straight back behind you while keeping your hips square to the floor.",
            "Gently lower your torso over your front leg and rest your forearms on the ground in front of you.",
        ],
        tips: [
            "Keep your hips level and avoid leaning to one side.",
        ],
        modifications: [
            "Place a folded blanket or block under the hip of the bent leg for support.",
            "If folding forward is uncomfortable, stay upright and support yourself with your hands on the floor.",
        ],
        benefits: [
            "Groin",
            "Psoas",
            "IT Band",
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Pike": {
        name: "Pike",
        imageStem: "r2_055_pike",
        instructions: [
            "Start on the floor in a push-up position.",
            "Engage your core to lift your hips towards the ceiling, forming an inverted \"V\" shape with your body.",
            "Distribute your weight evenly between your hands and feet and hold the position.",
        ],
        tips: [
            "Keep your legs straight and your heels off the ground.",
            "Keep your head between your arms and relax your neck.",
        ],
        modifications: [
            "For less intensity, keep your knees slightly bent and lower your hips.",
        ],
        benefits: [
            "Triceps",
            "Shoulders",
            "Chest",
            "Abdomen",
        ],
    },
    "Pistol Squat Hold": {
        name: "Pistol Squat Hold",
        imageStem: "r2_056_pistol_squat_hold",
        instructions: [
            "Start from a standing position with your feet hip-width apart.",
            "Engage your core to lift one leg off the ground and extend it forward.",
            "Lower your hips back and down into a squat position on your standing leg, keeping your weight on your heel.",
            "Keep your chest lifted and your back straight and hold the position.",
        ],
        tips: [
            "Aim to lower your hips until your thigh is parallel to the floor, while keeping your extended leg straight.",
            "Keep your knees in line with your toes.",
        ],
        modifications: [
            "For less intensity, perform the exercise with a smaller range of motion.",
        ],
        benefits: [
            "Calves",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Plow": {
        name: "Plow",
        imageStem: "r2_057_plow",
        instructions: [
            "Start lying on your back with your legs extended and your arms at your sides.",
            "Engage your core and lift your legs towards the ceiling, bringing them over your head.",
            "Slowly lower your legs towards the floor behind your head, keeping your hands on your lower back for support.",
            "If your feet reach the floor, extend your arms along the floor with your palms facing down.",
        ],
        tips: [
            "Keep your legs straight and your toes pointing towards the floor.",
            "Keep your neck relaxed and avoid turning your head.",
        ],
        modifications: [
            "If your feet do not reach the floor, keep your hands on your lower back for support and hold your legs in a comfortable position.",
            "Bend your knees slightly if straightening your legs is uncomfortable.",
        ],
        benefits: [
            "Calves",
            "Spine",
            "Neck",
            "Upper Back",
            "Shoulders",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Puppy Pose": {
        name: "Puppy Pose",
        imageStem: "r2_058_puppy_pose",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Walk your hands forward and lower your chest toward the floor.",
            "Keep your hips lifted and stacked directly over your knees and lower your forehead to the floor.",
        ],
        tips: [
            "Focus on creating a long line from your hips to your fingertips.",
        ],
        modifications: [
            "If your forehead doesn't reach the floor, rest it on a yoga block or folded blanket.",
            "For less intensity, don't walk your hands out as far.",
        ],
        benefits: [
            "Spine",
            "Upper Back",
            "Shoulders",
            "Chest",
            "Lower Back",
            "Abdomen",
        ],
    },
    "Push Up Hold": {
        name: "Push Up Hold",
        imageStem: "r2_059_push_up_hold",
        instructions: [
            "Start on the floor in a push-up position, with your hands slightly wider than your shoulders.",
            "Lower your body halfway down, keeping your elbows out in a natural position.",
            "Distribute your weight evenly between your hands and feet and hold the position.",
        ],
        tips: [
            "Avoid letting your hips drop or rise too high.",
            "Keep your elbows at about a 45-degree angle to your torso.",
        ],
        modifications: [
            "If holding the position is too intense, lower your knees to the floor.",
        ],
        benefits: [
            "Triceps",
            "Shoulders",
            "Chest",
        ],
    },
    "Push-Ups": {
        name: "Push-Ups",
        imageStem: "r2_060_push-ups",
        instructions: [
            "Start in a plank position on your hands and toes, with your hands placed slightly wider than shoulder-width apart.",
            "Keep your body in a straight line from your head to your heels.",
            "Engage your core and keep your elbows close to your body as you lower your chest towards the floor.",
            "Push through your palms to return to the starting position, fully extending your arms.",
        ],
        tips: [
            "Avoid letting your hips sag or lift too high.",
            "Keep your gaze slightly forward to maintain a neutral neck position.",
            "Engage your glutes and core to support your lower back.",
            "Breathe deeply, inhaling as you lower and exhaling as you push up.",
        ],
        modifications: [
            "If the full push-up is too challenging, perform the exercise with your knees on the floor.",
            "Do incline push-ups by placing your hands on an elevated surface, like a bench or countertop.",
            "For added intensity, try slow push-ups by lowering slowly and pressing up with control.",
        ],
        benefits: [
            "Triceps",
            "Shoulders",
            "Chest",
        ],
    },
    "Quad Stretch": {
        name: "Quad Stretch",
        imageStem: "r2_061_quad_stretch",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Bend one knee and bring your heel back towards your glutes.",
            "Grab your ankle with your hand and gently pull your foot back so it's directly beneath your glute.",
            "Slowly lean back to rest on your elbows.",
        ],
        tips: [
            "Keep your hips, knees, and ankles aligned.",
            "Make sure your foot stays underneath your glute and isn't out to the side.",
        ],
        modifications: [
            "If reaching your ankle is difficult, use a strap or towel looped around your foot for assistance.",
            "If you experience discomfort in your knee, try performing the exercise while lying on your side.",
        ],
        benefits: [
            "Knees",
            "Shins",
            "Hips",
            "Quadriceps",
            "Lower Back",
            "Ankles",
        ],
    },
    "Rag Doll": {
        name: "Rag Doll",
        imageStem: "r2_062_rag_doll",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your knees slightly bent.",
            "Inhale and extend your arms overhead, lengthening your spine.",
            "Exhale and slowly bend forward at the hips, letting your upper body hang down.",
            "Grab your opposite elbows and let your head and arms hang heavy.",
        ],
        tips: [
            "Keep your weight evenly distributed between your heels and the balls of your feet.",
            "Focus on lengthening your spine rather than reaching for the floor.",
        ],
        modifications: [
            "Bend your knees more to avoid straining your back.",
            "Use a block or chair to rest your elbows on if reaching the floor is difficult.",
        ],
        benefits: [
            "Calves",
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Reclined Butterfly": {
        name: "Reclined Butterfly",
        imageStem: "r2_063_reclined_butterfly",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Bring the soles of your feet together and let your knees fall out to the sides.",
            "Place your arms alongside your body with your palms facing up.",
        ],
        tips: [
            "Allow gravity to gently open your hips without forcing them.",
        ],
        modifications: [
            "Place cushions or blocks under your outer thighs for support.",
        ],
        benefits: [
            "Groin",
            "Spine",
            "Hips",
        ],
    },
    "Reverse Butterfly": {
        name: "Reverse Butterfly",
        imageStem: "r2_064_reverse_butterfly",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Widen your feet more than shoulder-width apart, then let your knees fall inwards toward each other.",
            "Continue to widen your feet and draw your knees together to increase the range of motion.",
        ],
        tips: [
            "Relax your inner thighs, allowing your knees to fall naturally inward.",
        ],
        modifications: [],
        benefits: [
            "Knees",
            "Hips",
        ],
    },
    "Reverse Lunge": {
        name: "Reverse Lunge",
        imageStem: "r2_065_reverse_lunge",
        instructions: [
            "Start from a kneeling position with your knees hip-width apart and the tops of your feet on the floor.",
            "Extend one leg straight out in front of you, pressing your heel into the floor.",
            "Hinge at your hips to lower your upper body toward the floor.",
            "Place your hands on the floor in front of you for balance.",
        ],
        tips: [
            "Keep your chest lifted and your back straight.",
        ],
        modifications: [
            "Place a folded blanket under your knee for additional support.",
        ],
        benefits: [
            "Calves",
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Reverse Plank": {
        name: "Reverse Plank",
        imageStem: "r2_066_reverse_plank",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Place your hands on the floor behind your hips with your fingers pointing toward your feet.",
            "Press your palms and heels into the floor and engage your core to lift your hips up toward the ceiling.",
            "Straighten your arms and legs to create a straight line from your head to your heels and hold the position.",
        ],
        tips: [
            "Keep your chest lifted and your head in a neutral position.",
            "Keep your arms straight but avoid locking your elbows.",
        ],
        modifications: [
            "For less intensity, bend your knees and keep your feet flat on the floor.",
            "If wrist discomfort occurs, try turning your fingers out to the sides slightly.",
        ],
        benefits: [
            "Shoulders",
            "Hamstrings",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Reverse Plank Leg Lift": {
        name: "Reverse Plank Leg Lift",
        imageStem: "r2_067_reverse_plank_leg_lift",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Place your hands on the floor behind your hips with your fingers pointing toward your feet.",
            "Press your palms and heels into the floor and engage your core to lift your hips up toward the ceiling.",
            "Keeping your legs straight, lift one leg up off the floor and hold the position.",
        ],
        tips: [
            "Straighten your arms and legs to create a straight line from your head to your heels",
            "Keep your chest lifted and your head in a neutral position.",
        ],
        modifications: [
            "For less intensity, keep both feet on the floor.",
            "If wrist discomfort occurs, try turning your fingers out to the sides slightly.",
        ],
        benefits: [
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Reverse Prayer Pose": {
        name: "Reverse Prayer Pose",
        imageStem: "r2_068_reverse_prayer_pose",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms at your sides.",
            "Bend both arms to bring your hands behind your back, then press your palms together with your fingers pointing upwards.",
            "Lift your chest and slide your hands up along your spine.",
        ],
        tips: [
            "Keep your shoulders relaxed and away from your ears.",
            "Avoid arching your back excessively.",
        ],
        modifications: [
            "If bringing your palms together is too difficult, hold onto opposite elbows behind your back instead.",
        ],
        benefits: [
            "Forearms",
            "Shoulders",
            "Chest",
            "Wrists",
        ],
    },
    "Reverse Shoulder": {
        name: "Reverse Shoulder",
        imageStem: "r2_069_reverse_shoulder",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Clasp your hands behind your back with your thumbs pointing towards the floor.",
            "Straighten your arms and gently lift your hands away from your back.",
            "Pull your shoulders back and down, lift your chest, and slightly tuck your chin.",
        ],
        tips: [
            "Keep your core engaged to support your lower back.",
            "Avoid arching your back excessively.",
        ],
        modifications: [
            "For less intensity, don't lift your hands as high behind your back.",
        ],
        benefits: [
            "Shoulders",
            "Chest",
            "Biceps",
        ],
    },
    "Reverse Table Top": {
        name: "Reverse Table Top",
        imageStem: "r2_070_reverse_table_top",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Place your hands on the floor behind your hips with your fingers pointing toward your feet.",
            "Press through your hands and feet to lift your hips towards the ceiling, forming a straight line from your shoulders to your knees.",
            "Keep your head in a neutral position or let it drop back gently.",
        ],
        tips: [
            "Engage your core and glutes to support your lower back.",
            "Keep your thighs and torso parallel to the floor.",
        ],
        modifications: [],
        benefits: [
            "Forearms",
            "Upper Back",
            "Shoulders",
            "Chest",
            "Wrists",
        ],
    },
    "Revolved Wide Leg Forward Fold": {
        name: "Revolved Wide Leg Forward Fold",
        imageStem: "r2_071_revolved_wide_leg_forward_fold",
        instructions: [
            "Start from a standing position with a wide stance and your arms at your sides.",
            "Hinge forward at your hips, lowering your torso toward the floor.",
            "Place one hand on the floor and rotate your torso, extending your opposite arm towards the ceiling.",
            "Return to the center and repeat on the other side, alternating dynamically.",
        ],
        tips: [
            "Keep your back straight and avoid rounding your spine.",
            "Engage your core to support your lower back during the rotation.",
        ],
        modifications: [
            "Use a block or elevated surface under your supporting hand for added stability.",
            "Perform smaller rotations if flexibility is limited.",
            "Keep your knees slightly bent to reduce hamstring strain.",
        ],
        benefits: [
            "Obliques",
            "Shoulders",
            "Hamstrings",
            "Core",
        ],
    },
    "Run In Place": {
        name: "Run In Place",
        imageStem: "r2_072_run_in_place",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Alternate lifting your knees in a running motion while pumping your arms.",
            "Focus on a steady rhythm and controlled breathing.",
        ],
        tips: [
            "Keep your movements light and controlled.",
            "Land softly on the balls of your feet to reduce impact.",
            "Maintain an upright posture throughout the movement.",
        ],
        modifications: [
            "Reduce the speed for a lower-intensity variation.",
            "Keep your knees lower if lifting them high feels too intense.",
        ],
        benefits: [
            "Knees",
            "Calves",
            "Feet",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Core",
            "Ankles",
            "Toes",
            "Glutes",
        ],
    },
    "Runner's Lunge Twist": {
        name: "Runner's Lunge Twist",
        imageStem: "r2_073_runner's_lunge_twist",
        instructions: [
            "Start in a plank position with your hands under your shoulders and your body in a straight line.",
            "Step one foot forward to the outside of your hand, entering a runner's lunge position.",
            "Twist your torso, reaching your opposite arm towards the ceiling.",
            "Return your hand to the floor and step back into the plank, and switch sides at the halfway point.",
        ],
        tips: [
            "Keep your hips low and your movements smooth for proper alignment.",
            "Focus on opening through your chest as you twist.",
            "Keep your back leg strong to maintain stability.",
        ],
        modifications: [
            "Reduce the depth of the lunge if flexibility is limited.",
            "Perform the movement more slowly to maintain balance.",
            "Use yoga blocks under your hands for additional support.",
        ],
        benefits: [
            "Shoulders",
            "Hips",
            "Chest",
            "Core",
        ],
    },
    "Saddle Pose": {
        name: "Saddle Pose",
        imageStem: "r2_074_saddle_pose",
        instructions: [
            "Start from a kneeling position with your knees hip-width apart.",
            "Spread your knees and feet apart and sit down on the floor between them.",
            "Slowly lean back onto your forearms, then continue lowering your upper body until your back is on the floor.",
            "Cross your arms over your head or rest them by your sides.",
        ],
        tips: [],
        modifications: [
            "If the stretch is too intense, use a cushion or block under your back for support.",
            "For less intensity, keep your upper body propped up on your elbows.",
        ],
        benefits: [
            "Knees",
            "Feet",
            "Psoas",
            "Spine",
            "Shins",
            "Hips",
            "Quadriceps",
            "Lower Back",
            "Ankles",
            "Abdomen",
        ],
    },
    "Scalene Stretch": {
        name: "Scalene Stretch",
        imageStem: "r2_075_scalene_stretch",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms at your sides.",
            "Cross your hands and place them firmly on your chest, just below your neck.",
            "Slowly lower your ear to your shoulder, then rotate your neck and point your chin up toward the ceiling.",
        ],
        tips: [
            "Keep your back straight and your shoulders relaxed.",
        ],
        modifications: [],
        benefits: [
            "Spine",
            "Neck",
            "Shoulders",
            "Chest",
        ],
    },
    "Scapula Stretch": {
        name: "Scapula Stretch",
        imageStem: "r2_076_scapula_stretch",
        instructions: [
            "Start from a standing or seated position with your back straight and your arms at your sides.",
            "Slowly turn your head to one side, then tilt your head downward to look at your armpit.",
            "Place your hand on the top of your head and gently pull down.",
        ],
        tips: [
            "Keep your back straight and your shoulders relaxed.",
        ],
        modifications: [],
        benefits: [
            "Spine",
            "Neck",
            "Upper Back",
            "Shoulders",
        ],
    },
    "Scorpion": {
        name: "Scorpion",
        imageStem: "r2_077_scorpion",
        instructions: [
            "Start lying on your stomach with your arms extended out to the sides.",
            "Slowly roll onto one side, bringing your opposite leg over and placing your foot flat on the floor behind your bottom leg.",
            "Continue to rotate your hips and keep your chest and shoulders on the floor.",
        ],
        tips: [
            "Move slowly and with control to avoid straining your back or shoulders.",
            "Engage your core to maintain stability and protect your lower back.",
        ],
        modifications: [
            "For less intensity, reduce the rotation in your hips.",
            "Place a cushion under your chest or hips for added support.",
            "If the stretch is too intense on your shoulders, bring your arms closer to your body.",
        ],
        benefits: [
            "Psoas",
            "Spine",
            "Shoulders",
            "Hips",
            "Quadriceps",
            "Abdomen",
        ],
    },
    "Seated Chest": {
        name: "Seated Chest",
        imageStem: "r2_078_seated_chest",
        instructions: [
            "Start on the floor in a seated position with your knees bent and your feet flat on the floor.",
            "Place your palms on the floor behind you with your fingers pointing away from your body.",
            "Keep your feet in place while slowly sliding your hands away from your body until your feel a stretch in your chest.",
        ],
        tips: [
            "Keep your arms straight and pull your shoulders back and down.",
            "Lift your chest and slightly tuck your chin.",
            "Avoid arching your back excessively.",
        ],
        modifications: [
            "For less intensity, keep your hands closer to your body.",
        ],
        benefits: [
            "Shoulders",
            "Chest",
            "Biceps",
        ],
    },
    "Seated Figure Four": {
        name: "Seated Figure Four",
        imageStem: "r2_079_seated_figure_four",
        instructions: [
            "Start from a seated position with your back straight and your arms resting at your sides.",
            "Cross one ankle over the opposite thigh, just above the knee.",
            "Sit tall and lengthen your spine, then gently lean forward from your hips.",
        ],
        tips: [
            "Place your hands on your crossed leg and press down towards the floor to further open your hip.",
        ],
        modifications: [
            "If the stretch is too intense, keep your torso upright instead of leaning forward.",
        ],
        benefits: [
            "IT Band",
            "Hips",
            "Lower Back",
            "Glutes",
        ],
    },
    "Seated Fold": {
        name: "Seated Fold",
        imageStem: "r2_080_seated_fold",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Extend your arms overhead to lengthen your spine.",
            "Hinge at your hips and reach forward to grab your toes.",
        ],
        tips: [
            "Keep your back flat and avoid rounding your spine.",
        ],
        modifications: [
            "If reaching your toes is difficult, place your hands on your shins or use a strap around your feet.",
            "Keep a slight bend in your knees if you have tight hamstrings.",
        ],
        benefits: [
            "Calves",
            "Spine",
            "Upper Back",
            "Shoulders",
            "Hamstrings",
            "Lower Back",
        ],
    },
    "Seated Hamstring": {
        name: "Seated Hamstring",
        imageStem: "r2_081_seated_hamstring",
        instructions: [
            "Start from a seated position on the edge of a chair with your back straight and your arms resting at your sides.",
            "Extend one leg out in front of you, keeping your heel on the floor and your toes pointing up.",
            "Sit tall and lengthen your spine, then gently lean forward from your hips.",
        ],
        tips: [
            "Keep your back straight and avoid rounding your spine as you fold forward.",
            "Reach your hands towards your extended foot to deepen the stretch.",
        ],
        modifications: [
            "If reaching your toes is difficult, place your hands on your shins or use a strap around your feet.",
        ],
        benefits: [
            "Calves",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Seated Knee Drops": {
        name: "Seated Knee Drops",
        imageStem: "r2_082_seated_knee_drops",
        instructions: [
            "Start in a seated position on the floor with your knees bent and feet flat on the floor, slightly wider than hip-width apart.",
            "Place your hands behind you for support and keep your chest upright.",
            "Drop one knee inward towards the floor, rotating it internally while keeping the opposite knee stable and upright.",
            "Return to the starting position and repeat the movement with the other knee, alternating dynamically.",
        ],
        tips: [
            "Focus on keeping your torso upright and stable throughout the motion.",
            "Move smoothly and with control, focusing on the internal rotation of each hip.",
            "Avoid forcing the range of motion; let your hip guide the movement naturally.",
        ],
        modifications: [
            "Reduce the depth of the knee drop if flexibility is limited.",
        ],
        benefits: [
            "Hips",
        ],
    },
    "Seated Straddle": {
        name: "Seated Straddle",
        imageStem: "r2_083_seated_straddle",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Open your legs wide apart and place your hands on the floor in front of you.",
            "Sit up tall to lengthen your spine, then hinge at your hips to reach forward with your hands and lower your upper body towards the floor.",
        ],
        tips: [
            "Keep your back straight and avoid rounding your spine.",
            "Flex your feet and keep your toes pointing upward.",
        ],
        modifications: [
            "If reaching forward is difficult, rest your hands on blocks or a chair in front of you.",
            "Sit on a folded blanket to raise your hips and improve comfort.",
        ],
        benefits: [
            "Groin",
            "Calves",
            "Spine",
            "Upper Back",
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Seated Twist": {
        name: "Seated Twist",
        imageStem: "r2_084_seated_twist",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Cross one leg over the other, placing your foot on the floor outside of your opposite thigh.",
            "Rotate your torso and place your elbow on the outside of your top knee and your other hand behind you for support.",
            "Continue to rotate your torso and turn your head to look behind you.",
        ],
        tips: [
            "Lengthen your spine and keep your back straight.",
        ],
        modifications: [],
        benefits: [
            "Spine",
            "IT Band",
            "Upper Back",
            "Obliques",
            "Hips",
            "Chest",
            "Lower Back",
            "Glutes",
        ],
    },
    "Shoulder Cross": {
        name: "Shoulder Cross",
        imageStem: "r2_085_shoulder_cross",
        instructions: [
            "Start lying on your side with your legs straight and your bottom arm extended in front of you.",
            "Slowly roll onto your stomach, keeping your bottom arm on the floor.",
            "Reach your other arm up over your head and place your hand on the floor.",
        ],
        tips: [
            "Keep your bottom arm relaxed on the floor.",
        ],
        modifications: [
            "If the stretch is too intense, reduce the amount of rotation onto your stomach.",
        ],
        benefits: [
            "Triceps",
            "Upper Back",
            "Shoulders",
        ],
    },
    "Shoulder Opener": {
        name: "Shoulder Opener",
        imageStem: "r2_086_shoulder_opener",
        instructions: [
            "Start lying on your stomach with your arms extended out to the sides.",
            "Slowly roll onto one side, bringing your opposite leg over and placing your foot flat on the floor behind your bottom leg.",
            "Keep your bottom arm extended and allow the weight of your top leg to open your chest and shoulder.",
            "Use your opposite hand to gently press into the floor for support and to deepen the stretch.",
        ],
        tips: [
            "Move slowly and with control to avoid straining your shoulder.",
        ],
        modifications: [
            "If the stretch is too intense, reduce the amount of rotation in your body.",
        ],
        benefits: [
            "Shoulders",
            "Chest",
            "Biceps",
        ],
    },
    "Shoulder Rolls": {
        name: "Shoulder Rolls",
        imageStem: "r2_087_shoulder_rolls",
        instructions: [
            "Start from a seated position with your back straight and your shoulders relaxed.",
            "Lift your shoulders up towards your ears.",
            "Roll your shoulders back and down, making a circular motion.",
            "Repeat the movement and reverse direction at the halfway point.",
        ],
        tips: [
            "Focus on creating a smooth, fluid motion to avoid straining your neck.",
            "Keep your neck relaxed and your gaze forward.",
        ],
        modifications: [
            "If you experience discomfort, perform smaller circles or just lift and lower your shoulders.",
        ],
        benefits: [
            "Neck",
            "Upper Back",
            "Shoulders",
        ],
    },
    "Shoulder Rolls (Standing)": {
        name: "Shoulder Rolls (Standing)",
        imageStem: "r2_088_shoulder_rolls",
        instructions: [
            "Start from a standing position with your back straight and your arms at your sides.",
            "Lift your shoulders up towards your ears.",
            "Roll your shoulders back and down, making a circular motion.",
            "Repeat the movement and reverse direction at the halfway point.",
        ],
        tips: [
            "Focus on creating a smooth, fluid motion to avoid straining your neck.",
            "Keep your neck relaxed and your gaze forward.",
        ],
        modifications: [
            "If you experience discomfort, perform smaller circles or just lift and lower your shoulders.",
        ],
        benefits: [
            "Neck",
            "Upper Back",
            "Shoulders",
        ],
    },
    "Shoulder Stand": {
        name: "Shoulder Stand",
        imageStem: "r2_089_shoulder_stand",
        instructions: [
            "Start lying on your back with your legs extended and your arms at your sides.",
            "Press your arms into the floor to lift your legs and hips up towards the ceiling",
            "Support your lower back with your hands and extend your legs straight up, keeping your body in a straight line from your shoulders to your feet.",
        ],
        tips: [
            "Keep your neck relaxed and avoid turning your head to the sides.",
            "Engage your core and glutes to maintain your balance.",
        ],
        modifications: [
            "Keep your legs bent if straightening them is too difficult.",
        ],
        benefits: [
            "Neck",
            "Shoulders",
        ],
    },
    "Side Bend": {
        name: "Side Bend",
        imageStem: "r2_090_side_bend",
        instructions: [
            "Start from a seated position with your back straight and your arms resting at your sides.",
            "Raise one of your arms overhead and place your other hand on your hip.",
            "Gently bend to the side, reaching over with the raised arm.",
        ],
        tips: [
            "Keep your shoulders relaxed and avoid hunching them.",
            "Avoid lifting off the chair or twisting your torso.",
        ],
        modifications: [
            "If reaching overhead is uncomfortable, place your hand on the side of your head.",
        ],
        benefits: [
            "Spine",
            "Obliques",
            "Lower Back",
            "Lats",
            "Abdomen",
        ],
    },
    "Side Bend (Standing)": {
        name: "Side Bend (Standing)",
        imageStem: "r2_091_side_bend",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms resting at your sides.",
            "Raise one of your arms overhead and place your other hand on your hip.",
            "Gently bend to the side, reaching over with your raised arm.",
        ],
        tips: [
            "Keep your hips and shoulders square and avoid twisting your torso.",
        ],
        modifications: [
            "If reaching overhead is uncomfortable, place your hand on the side of your head.",
        ],
        benefits: [
            "Spine",
            "Obliques",
            "Lower Back",
            "Lats",
            "Abdomen",
        ],
    },
    "Side Leg Raise": {
        name: "Side Leg Raise",
        imageStem: "r2_092_side_leg_raise",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands on your hips.",
            "Shift your weight onto one leg and engage your core to lift your opposite leg straight out to the side.",
            "Keep your hips square and your torso upright and hold the position.",
        ],
        tips: [
            "Keep your standing leg slightly bent to avoid locking the knee.",
            "Focus on a fixed point in front of you to help maintain balance.",
        ],
        modifications: [
            "Lift your leg to a lower height if necessary to maintain proper form.",
            "Perform the exercise near a wall for support if needed.",
        ],
        benefits: [
            "Obliques",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Side Lunge": {
        name: "Side Lunge",
        imageStem: "r2_093_side_lunge",
        instructions: [
            "Start from a standing position with your feet wide apart.",
            "Shift your weight to one side, bending your knee and keeping your other leg straight.",
            "Place your hands on the floor and lower your hips until you feel a stretch in your inner thigh.",
            "Rotate the foot on your straight leg so your heel is on the ground and your toes are pointed out.",
        ],
        tips: [
            "Lift your chest and keep your back straight.",
        ],
        modifications: [
            "If the stretch is too intense, don't lower your hips as much.",
            "Use a chair or wall for balance support if needed.",
        ],
        benefits: [
            "Groin",
            "Calves",
            "Hips",
            "Hamstrings",
        ],
    },
    "Side Lunge Hold": {
        name: "Side Lunge Hold",
        imageStem: "r2_094_side_lunge_hold",
        instructions: [
            "Start from a standing position with your feet wide and your toes pointed forward.",
            "Shift your weight to one side, bending your knee to lower your hips toward your foot until your thigh is parallel to the floor.",
            "Keep your opposite leg straight and hold the position.",
        ],
        tips: [
            "Keep your chest lifted and your back straight.",
            "Keep your bent knee in line with your toes.",
        ],
        modifications: [
            "For less intensity, perform the exercise with a smaller range of motion.",
        ],
        benefits: [
            "Calves",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Single Arm Plank": {
        name: "Single Arm Plank",
        imageStem: "r2_095_single_arm_plank",
        instructions: [
            "Start on the floor in a push-up position.",
            "Engage your core to lift one hand off the floor and out to the side, while keeping your body in a straight line.",
            "Distribute your weight evenly between your hands and feet and hold the position.",
        ],
        tips: [
            "Keep your hips level and avoiding rotation.",
        ],
        modifications: [
            "For less intensity, drop to your knees while maintaining a straight line from knees to head.",
        ],
        benefits: [
            "Triceps",
            "Upper Back",
            "Obliques",
            "Shoulders",
            "Chest",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Single Knee-to-Chest": {
        name: "Single Knee-to-Chest",
        imageStem: "r2_096_single_knee-to-chest",
        instructions: [
            "Start lying on your back with your legs extended and your arms at your sides.",
            "Bend one knee and draw it towards your chest, holding your shin with both hands.",
            "Gently pull your knee closer to your chest while keeping your other leg straight.",
        ],
        tips: [
            "Relax your head and neck on the floor.",
            "Keep your hips square and your lower back pressed into the floor.",
        ],
        modifications: [
            "If you can't reach your shin, pull on your thigh or use a towel around your knee.",
        ],
        benefits: [
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Single Leg Calf Stretch": {
        name: "Single Leg Calf Stretch",
        imageStem: "r2_097_single_leg_calf_stretch",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Tuck your toes under and lift your hips up and back, straightening your arms and legs.",
            "Lift one foot off the floor, crossing it over to rest on your opposite heel, then straighten your standing leg.",
        ],
        tips: [
            "Distribute your weight evenly between your hands and foot.",
            "Keeping your standing heel pressed into the floor.",
        ],
        modifications: [],
        benefits: [
            "Calves",
            "Feet",
            "Hamstrings",
            "Ankles",
        ],
    },
    "Single Leg Deadlift": {
        name: "Single Leg Deadlift",
        imageStem: "r2_098_single_leg_deadlift",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Shift your weight to one foot and raise your other foot slightly off the floor behind you.",
            "Hinge at your hips, lowering your torso forward while simultaneously lifting your leg behind you.",
            "Keep a slight bend in your standing leg and let your arms hang naturally.",
        ],
        tips: [
            "Aim to lower your torso and lift your back leg until they are both parallel to the floor.",
            "Keep your back straight so your body is in a straight line from head to toe.",
        ],
        modifications: [],
        benefits: [
            "Feet",
            "Hamstrings",
            "Lower Back",
            "Ankles",
            "Glutes",
        ],
    },
    "Single Leg Glute Bridges": {
        name: "Single Leg Glute Bridges",
        imageStem: "r2_099_single_leg_glute_bridges",
        instructions: [
            "Start lying on your back with one knee bent, foot flat on the floor, and the other leg extended straight up into the air.",
            "Engage your glutes and lift your hips towards the ceiling, keeping your extended leg straight up.",
            "Lower your hips back to the floor with control and repeat the movement.",
            "Switch sides at the halfway point.",
        ],
        tips: [
            "Focus on squeezing your glutes at the top of the movement.",
            "Move smoothly and avoid arching your back.",
        ],
        modifications: [
            "Keep both feet on the floor if balance is a challenge.",
            "Reduce the range of motion if the exercise feels too intense.",
        ],
        benefits: [
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Single Leg Shin Stretch": {
        name: "Single Leg Shin Stretch",
        imageStem: "r3_001_single_leg_shin_stretch",
        instructions: [
            "Start from a kneeling position with your knees hip-width apart and your arms at your sides.",
            "Step forward with one foot, placing it flat on the floor next to your opposite knee.",
            "Slowly lower your hips back and down to sit on your back heel.",
            "Place your hands on the floor behind you, fingers pointing toward your feet, and lean back.",
        ],
        tips: [
            "Keep your back straight and your chest lifted.",
        ],
        modifications: [],
        benefits: [
            "Feet",
            "Shins",
            "Ankles",
        ],
    },
    "Single Leg Stand": {
        name: "Single Leg Stand",
        imageStem: "r3_002_single_leg_stand",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands on your hips.",
            "Engage your core to lift one foot off the floor and extend it out in front of you.",
            "Balance on your standing leg and hold the position.",
        ],
        tips: [
            "Keep your standing leg slightly bent, not locked.",
        ],
        modifications: [
            "Place your hands on a wall or chair for support.",
        ],
        benefits: [
            "Feet",
            "Ankles",
        ],
    },
    "Sit-Ups": {
        name: "Sit-Ups",
        imageStem: "r3_003_sit-ups",
        instructions: [
            "Start lying on your back with your knees bent and feet flat on the floor, hip-width apart.",
            "Place your hands behind your head or cross them over your chest.",
            "Engage your core and lift your torso towards your knees, using your abdominal muscles.",
            "Lower your torso back to the starting position with control.",
        ],
        tips: [
            "Keep your feet firmly on the floor throughout the movement.",
            "Engage your core to avoid straining your neck or lower back.",
            "Exhale as you lift and inhale as you lower for steady breathing.",
        ],
        modifications: [
            "If full sit-ups are challenging, perform partial sit-ups or crunches.",
            "For added support, tuck your feet under a stable surface.",
            "If additional back support is needed, perform sit-ups on a mat or cushioned surface.",
        ],
        benefits: [
            "Obliques",
            "Abdomen",
        ],
    },
    "Soleus Stretch": {
        name: "Soleus Stretch",
        imageStem: "r3_004_soleus_stretch",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Step forward with one foot, then bend both knees to slowly lower your hips downward.",
            "Keep both of your feet flat on the floor and lean forward slightly to feel a stretch in your lower calf.",
        ],
        tips: [
            "Keep your back heel pressed firmly into the floor.",
            "Keep your back straight and your feet pointing forward.",
        ],
        modifications: [
            "Place your hands on a wall or chair for additional support.",
        ],
        benefits: [
            "Calves",
            "Feet",
            "Ankles",
        ],
    },
    "Spiderman Push Up Hold": {
        name: "Spiderman Push Up Hold",
        imageStem: "r3_005_spiderman_push_up_hold",
        instructions: [
            "Start on the floor in a push-up position, with your hands slightly wider than your shoulders.",
            "Lower your body halfway down and engage your core to lift one foot off the floor and bring your knee to your elbow.",
            "Distribute your weight evenly between your hands and foot and hold the position.",
        ],
        tips: [
            "Focus on keeping your hips level and avoiding rotation.",
            "Keep your elbows at about a 45-degree angle to your torso.",
        ],
        modifications: [
            "If holding the position is too intense, lower your knee to the floor.",
        ],
        benefits: [
            "Triceps",
            "Obliques",
            "Shoulders",
            "Chest",
        ],
    },
    "Spinal Twist": {
        name: "Spinal Twist",
        imageStem: "r3_006_spinal_twist",
        instructions: [
            "Start lying on your back with your legs extended and your arms at your sides.",
            "Bend one knee and place your foot flat on the floor.",
            "Gently lower your bent knee across your body towards the opposite side, allowing your torso and hips to twist.",
            "Place your opposite hand on the outside of your bent knee and extend your other arm out to the side.",
        ],
        tips: [
            "Keep your shoulders flat on the floor.",
        ],
        modifications: [
            "If the twist is too intense, place a cushion or block under your bent knee for support.",
        ],
        benefits: [
            "Spine",
            "IT Band",
            "Upper Back",
            "Obliques",
            "Chest",
            "Lower Back",
            "Glutes",
        ],
    },
    "Split Lunge Hold": {
        name: "Split Lunge Hold",
        imageStem: "r3_007_split_lunge_hold",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your hands on your hips.",
            "Step one foot back, lowering your back knee towards the floor while keeping it off the ground.",
            "Keep both knees at 90 degree angles and hold the position.",
        ],
        tips: [
            "Keep your chest lifted and your back straight.",
            "Align your front knee above your ankle.",
        ],
        modifications: [
            "For less intensity, keep your back knee further from the floor.",
            "Use a chair or wall for balance support if needed.",
        ],
        benefits: [
            "Calves",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Split Squat Twists": {
        name: "Split Squat Twists",
        imageStem: "r3_008_split_squat_twists",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Step one foot forward into a split stance while lowering into a split squat, bending both knees.",
            "Twist your torso towards your front leg, keeping your back straight and core engaged.",
            "Return to standing and repeat on the same side and switch sides at the halfway point.",
        ],
        tips: [
            "Engage your core to stabilize your torso during the twist.",
            "Keep your front knee aligned with your ankle to avoid strain.",
        ],
        modifications: [
            "Reduce the depth of the split squat if it feels too intense.",
            "Perform the twist without lowering fully into the squat.",
        ],
        benefits: [
            "Obliques",
            "Core",
            "Glutes",
        ],
    },
    "Split Squats": {
        name: "Split Squats",
        imageStem: "r3_009_split_squats",
        instructions: [
            "Start from a standing position with one foot forward and the other foot stepped back into a split stance.",
            "Bend both knees to lower your hips straight down, keeping your front knee aligned over your ankle and your back knee hovering just above the floor.",
            "Push through your front heel to return to standing.",
            "Repeat the movement and switch sides at the halfway point.",
        ],
        tips: [
            "Engage your core to maintain balance and stability.",
            "Keep your torso upright and avoid leaning forward.",
            "Focus on controlled, steady movements to maximize effectiveness.",
        ],
        modifications: [
            "Reduce the depth of the lunge if flexibility or strength is limited.",
            "Hold onto a chair or wall for balance if needed.",
            "Perform the exercise more slowly to ensure proper form.",
        ],
        benefits: [
            "Calves",
            "Hamstrings",
            "Quadriceps",
            "Core",
            "Glutes",
        ],
    },
    "Squat Hold": {
        name: "Squat Hold",
        imageStem: "r3_010_squat_hold",
        instructions: [
            "Start from a standing position with your feet shoulder-width apart and your toes pointed slightly outward.",
            "Lower your hips back and down as if sitting into a chair, keeping your weight on your heels.",
            "Keep your chest lifted and your back straight and hold the position.",
        ],
        tips: [
            "Aim to lower your hips until your thighs are parallel to the floor.",
            "Keep your knees in line with your toes.",
        ],
        modifications: [
            "For less intensity, perform the exercise with a smaller range of motion.",
        ],
        benefits: [
            "Calves",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Squat Stretch": {
        name: "Squat Stretch",
        imageStem: "r3_011_squat_stretch",
        instructions: [
            "Start from a standing position with your feet shoulder-width apart and your toes pointed slightly outward.",
            "Lower your hips down into a squat position, keeping your heels on the ground.",
            "Place your elbows on the inside of your knees and press your palms together.",
        ],
        tips: [
            "Keep your chest lifted and your back straight.",
            "Gently push your knees outward with your elbows.",
        ],
        modifications: [
            "If your heels lift, place a folded towel under them for support.",
            "Hold onto a chair or wall for balance if needed.",
        ],
        benefits: [
            "Knees",
            "Groin",
            "Calves",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Lower Back",
            "Glutes",
        ],
    },
    "Standing Frog": {
        name: "Standing Frog",
        imageStem: "r3_012_standing_frog",
        instructions: [
            "Start from a standing position with your feet wide apart and your toes pointing outward.",
            "Lower your hips down into a squat position until your thighs are parallel to the floor.",
            "Please your hands on the inside of your knees and gently press outward.",
        ],
        tips: [
            "Keep your chest lifted and your back straight.",
            "Keep your knees in line with your toes.",
        ],
        modifications: [
            "Hold onto a chair or wall for balance if needed.",
        ],
        benefits: [
            "Knees",
            "Groin",
            "Hips",
            "Glutes",
        ],
    },
    "Standing Hip Openers": {
        name: "Standing Hip Openers",
        imageStem: "r3_013_standing_hip_openers",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Lift one foot off the floor, grabbing it with the opposite-side hand, and pull it up, allowing your knee to point outward.",
            "Release and return to standing before repeating on the other leg.",
            "Alternate sides dynamically in a controlled motion.",
        ],
        tips: [
            "Focus on keeping your torso upright to maintain balance.",
            "Move slowly and with control to avoid over-rotating your hip.",
            "Keep your standing knee slightly bent for stability.",
        ],
        modifications: [
            "Hold onto a wall or chair for added support.",
            "Keep your range of motion smaller if flexibility is limited.",
        ],
        benefits: [
            "Hips",
            "Glutes",
        ],
    },
    "Standing Lunge Twist": {
        name: "Standing Lunge Twist",
        imageStem: "r3_014_standing_lunge_twist",
        instructions: [
            "Start from a kneeling position with your knees hip-width apart and your arms at your sides.",
            "Step forward with one leg to place your foot on the floor in front of you, forming a 90-degree angle with both knees.",
            "Place your opposite hand on the floor inside your front foot and twist your torso, reaching your other arm towards the ceiling.",
            "Straighten your back leg to lift your knee of the floor.",
        ],
        tips: [
            "Keep your back straight and your front knee aligned over your ankle.",
        ],
        modifications: [
            "If the twist is too intense, keep your back knee on the ground.",
            "Use a block under your hand for extra support.",
        ],
        benefits: [
            "Psoas",
            "Spine",
            "Upper Back",
            "Shoulders",
            "Hips",
            "Chest",
            "Lower Back",
        ],
    },
    "Standing Quad": {
        name: "Standing Quad",
        imageStem: "r3_015_standing_quad",
        instructions: [
            "Start from a standing position with your feet hip-width apart.",
            "Bend one knee and bring your heel towards your glutes.",
            "Reach behind you with both hands to hold your ankle and gently pull your heel closer to your glutes.",
            "Keep your knees together and your hips aligned.",
        ],
        tips: [
            "Engage your core to maintain balance.",
            "Keep your standing leg slightly bent to avoid locking the knee.",
            "Avoid arching your back or leaning forward.",
        ],
        modifications: [
            "Use a wall or chair for balance support if needed.",
            "If reaching your ankle is difficult, use a strap or towel looped around your foot for assistance.",
            "Keep your other hand on your hip or extend it out to the side for added balance.",
        ],
        benefits: [
            "Knees",
            "Feet",
            "Psoas",
            "Shins",
            "Hips",
            "Quadriceps",
            "Lower Back",
            "Ankles",
            "Abdomen",
        ],
    },
    "Sumo Squat Hold": {
        name: "Sumo Squat Hold",
        imageStem: "r3_016_sumo_squat_hold",
        instructions: [
            "Start from a standing position with your feet wide apart and your toes pointing outward.",
            "Lower your hips back and down as if sitting into a chair, keeping your weight on your heels.",
            "Keep your chest lifted and your back straight and hold the position.",
        ],
        tips: [
            "Aim to lower your hips until your thighs are parallel to the floor.",
            "Keep your knees in line with your toes.",
        ],
        modifications: [
            "For less intensity, perform the exercise with a smaller range of motion.",
        ],
        benefits: [
            "Calves",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Sumo Squat Twists": {
        name: "Sumo Squat Twists",
        imageStem: "r3_017_sumo_squat_twists",
        instructions: [
            "Start from a standing position with a wide stance and your toes pointing outward.",
            "Bend your knees and lower into a sumo squat, placing your hands on your knees for support.",
            "Drop one shoulder towards the center while gently pressing the opposite knee outward.",
            "Return to the center and repeat the movement on the other side, alternating dynamically.",
        ],
        tips: [
            "Keep your chest open and avoid rounding your back.",
            "Focus on feeling the stretch through your chest and shoulder with each twist.",
        ],
        modifications: [
            "Reduce the depth of the squat if it feels too intense.",
            "Perform the twists more slowly to maintain proper form.",
        ],
        benefits: [
            "Groin",
            "Shoulders",
            "Chest",
        ],
    },
    "Superman": {
        name: "Superman",
        imageStem: "r3_018_superman",
        instructions: [
            "Start lying on your stomach with your arms extended in front of you.",
            "Engage your core to lift your arms, chest, and legs off the floor.",
            "Keep your head in line with your spine and hold the position.",
        ],
        tips: [
            "Focus on engaging your back and glute muscles.",
            "Lengthen your body, reaching with your fingertips and toes.",
            "Keep your head in a neutral position to avoid straining your neck.",
        ],
        modifications: [
            "For less intensity, lift only your arms or only your legs at a time.",
        ],
        benefits: [
            "Upper Back",
            "Shoulders",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Thread the Needle": {
        name: "Thread the Needle",
        imageStem: "r3_019_thread_the_needle",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Rotate your body and lift one arm straight up towards the ceiling, opening your chest.",
            "Next, lower your extended arm and slide it under your other arm and across your body with your palm facing up.",
            "Lower your shoulder and the side of your head toward the floor, then unwind and repeat the movement.",
        ],
        tips: [
            "Keep your other hand firmly planted on the floor for support.",
            "Keep your hips aligned with your knees.",
        ],
        modifications: [],
        benefits: [
            "Spine",
            "Upper Back",
            "Shoulders",
            "Chest",
            "Lats",
        ],
    },
    "Thunderbolt": {
        name: "Thunderbolt",
        imageStem: "r3_020_thunderbolt",
        instructions: [
            "Start from a kneeling position with your knees together and the tops of your feet on the floor.",
            "Sit back on your heels with your big toes touching and your heels separated.",
            "Place your hands on your thighs with your palms facing down.",
            "Sit up tall with your back straight and your shoulders relaxed.",
        ],
        tips: [
            "Engage your core to support your lower back.",
        ],
        modifications: [
            "If sitting on your heels is uncomfortable, place a cushion or folded blanket between your heels and hips for added support.",
            "Place a folded blanket under your knees if you feel any discomfort.",
        ],
        benefits: [
            "Knees",
            "Feet",
            "Shins",
            "Quadriceps",
            "Ankles",
        ],
    },
    "Toe Raises": {
        name: "Toe Raises",
        imageStem: "r3_021_toe_raises",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your back against a wall.",
            "Step forward with both feet so your heels are an arms-lengths from the wall.",
            "Lift your hips and head off the wall so your body is supported only by your shoulders.",
            "Keeping your heels pressed into the floor, lift your toes off the ground and hold the position.",
        ],
        tips: [
            "Keep your arms relaxed at your sides.",
        ],
        modifications: [
            "For less intensity, keep your hips against the wall for additional support.",
        ],
        benefits: [
            "Feet",
            "Shins",
            "Ankles",
        ],
    },
    "Toe Squat": {
        name: "Toe Squat",
        imageStem: "r3_022_toe_squat",
        instructions: [
            "Start from a kneeling position with the tops of your feet on the floor.",
            "Tuck your toes under and slowly sit back on your heels, putting weight on your toes.",
            "Sit up tall with your back straight, relax your shoulders and place your hands on your thighs.",
        ],
        tips: [
            "Focus on distributing your weight evenly across all your toes.",
        ],
        modifications: [
            "If the stretch is too intense, keep your hands on the floor in front of you.",
        ],
        benefits: [
            "Calves",
            "Feet",
            "Ankles",
            "Toes",
        ],
    },
    "Toe Stretch": {
        name: "Toe Stretch",
        imageStem: "r3_023_toe_stretch",
        instructions: [
            "Start on your hands and knees in a tabletop position, with the tops of your feet flat on the floor.",
            "Tuck your toes under on one foot, then slowly lean back and lower your hips towards your heels, while keeping your hands pressed into the floor.",
        ],
        tips: [
            "Distribute your weight evenly across both hands.",
        ],
        modifications: [],
        benefits: [
            "Feet",
            "Toes",
        ],
    },
    "Toe Touch": {
        name: "Toe Touch",
        imageStem: "r3_024_toe_touch",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Keeping your back straight, hinge at your hips to bend forward, lowering your upper body toward your legs.",
            "Relax your head, neck, and arms and try to place your palms on the floor.",
        ],
        tips: [
            "Focus on lengthening your spine as you fold forward.",
            "Keep your legs straight but not locked.",
        ],
        modifications: [
            "If you can't reach the floor, place your hands on your shins or thighs.",
        ],
        benefits: [
            "Calves",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Toe Touch Hold": {
        name: "Toe Touch Hold",
        imageStem: "r3_025_toe_touch_hold",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Engage your core to extended your legs and lift them straight up into the air.",
            "Lift your head, neck, and shoulders off the floor and reach up with your arms to touch your toes.",
            "Hold the position.",
        ],
        tips: [],
        modifications: [],
        benefits: [
            "Abdomen",
        ],
    },
    "Toe Touch Twist": {
        name: "Toe Touch Twist",
        imageStem: "r3_026_toe_touch_twist",
        instructions: [
            "Start from a standing position with your feet wide apart and your arms extended out to the sides.",
            "Bend forward, rotating your torso to touch your toe with your opposite hand and raising your other hand up to the ceiling.",
            "Return to the starting position and repeat the movement on your other side.",
        ],
        tips: [
            "Keep your spine long and avoid rounding your back.",
            "Engage your core and keep a slight bend in your knees.",
        ],
        modifications: [
            "If reaching your foot is difficult, touch your shin or knee instead.",
        ],
        benefits: [
            "Spine",
            "Upper Back",
            "Obliques",
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
            "Abdomen",
        ],
    },
    "Toe-to-Wall": {
        name: "Toe-to-Wall",
        imageStem: "r3_027_toe-to-wall",
        instructions: [
            "Start from a standing position facing a wall, about an arm's length away.",
            "Place your hands on the wall at shoulder height for support.",
            "Place one foot against the wall, with your toes pointing upward and your heel on the floor.",
            "Keeping both legs straight, lean forward and lift your back heel off the floor.",
        ],
        tips: [
            "Keep both feet pointing straight ahead.",
        ],
        modifications: [],
        benefits: [
            "Calves",
            "Feet",
            "Ankles",
            "Toes",
        ],
    },
    "Towel Calf Stretch": {
        name: "Towel Calf Stretch",
        imageStem: "r3_028_towel_calf_stretch",
        instructions: [
            "Start on the floor in a seated position with your legs extended in front of you.",
            "Loop a towel or strap around the ball of one of your feet.",
            "Keeping your back straight and your chest lifted, gently pull the towel towards you, bringing your toes towards your body.",
        ],
        tips: [
            "Keep your leg straight, but don't lock your knee.",
        ],
        modifications: [],
        benefits: [
            "Calves",
            "Feet",
            "Hamstrings",
        ],
    },
    "Tree Pose": {
        name: "Tree Pose",
        imageStem: "r3_029_tree_pose",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Shift your weight onto one leg and slowly lift your opposite foot off the floor.",
            "Place the sole of your lifted foot on your inner thigh and extend your hands overhead with your palms facing each other.",
        ],
        tips: [
            "Keep your standing leg straight, but avoid locking your knee.",
        ],
        modifications: [
            "If balance is challenging, perform the pose near a wall or chair for support.",
            "For less difficulty, place your lifted foot it on your ankle or calf rather than your thigh.",
            "Keep your hands in prayer position if extending your arms overhead feels uncomfortable.",
        ],
        benefits: [
            "Shoulders",
            "Hips",
            "Quadriceps",
            "Lower Back",
            "Glutes",
        ],
    },
    "Triangle Pose": {
        name: "Triangle Pose",
        imageStem: "r3_030_triangle_pose",
        instructions: [
            "Start from a standing position with your feet wide apart.",
            "Turn your front foot outward and extend your arms out to the sides at shoulder height, parallel to the floor, palms facing down.",
            "Engage your core and reach forward over your front leg, lowering your front hand to the floor, while extending your other arm up towards the ceiling.",
            "Keep your chest open and gaze towards your top hand or straight ahead.",
        ],
        tips: [
            "Engage your core to maintain stability and prevent your torso from collapsing.",
            "Keep both legs straight but avoid locking your knees.",
        ],
        modifications: [
            "For less intensity, place your hand on your ankle or shin.",
            "If keeping your top arm lifted is uncomfortable, rest your hand on your hip.",
            "If balance is a challenge, practice with your back against a wall for support.",
        ],
        benefits: [
            "Groin",
            "Spine",
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Chest",
        ],
    },
    "Trunk Rotation": {
        name: "Trunk Rotation",
        imageStem: "r3_031_trunk_rotation",
        instructions: [
            "Start from a seated position with your back straight and your arms resting at your sides.",
            "Cross one leg over your other leg and rotate your torso to place your opposite hand on the outside of your top knee.",
            "Place your other hand on the back of your chair and continue to rotate your torso and turn your head to look behind you.",
        ],
        tips: [],
        modifications: [
            "If the stretch is too difficult, keep both of your feet flat on the floor and avoid crossing your legs.",
        ],
        benefits: [
            "Spine",
            "IT Band",
            "Upper Back",
            "Obliques",
            "Hips",
            "Chest",
            "Lower Back",
            "Glutes",
            "Lats",
        ],
    },
    "Trunk Twist": {
        name: "Trunk Twist",
        imageStem: "r3_032_trunk_twist",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms extended out to the sides at shoulder height.",
            "Engage your core and gently twist your upper body to one side.",
            "Turn your head to look over your shoulder in the direction of the twist.",
            "Return to the starting position and repeat on the other side.",
        ],
        tips: [
            "Keep your knees slightly bent and your hips facing forward throughout the movement.",
        ],
        modifications: [
            "For less intensity, keep your arms bent with hands on your hips.",
        ],
        benefits: [
            "Knees",
            "Spine",
            "IT Band",
            "Obliques",
            "Shoulders",
            "Hips",
            "Lower Back",
            "Lats",
            "Abdomen",
        ],
    },
    "Twisted Sphinx": {
        name: "Twisted Sphinx",
        imageStem: "r3_033_twisted_sphinx",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Extend one leg back and bring your other leg under your body, extending your foot straight out to the opposite side.",
            "Lower your hips to the floor and rest your upper body on your forearms.",
        ],
        tips: [
            "Relax your neck and shoulders and keep your gaze down.",
        ],
        modifications: [],
        benefits: [
            "Spine",
            "IT Band",
            "Hips",
            "Hamstrings",
            "Lower Back",
            "Glutes",
        ],
    },
    "Upward Dog": {
        name: "Upward Dog",
        imageStem: "r3_034_upward_dog",
        instructions: [
            "Start lying on your stomach with your legs extended and your hands under your shoulders.",
            "Press your palms into the floor, straightening your arms to lift your upper body and legs off the floor.",
            "Lift your chest, relax your shoulders, and look slightly upward.",
        ],
        tips: [
            "Only the tops of your feet and your palms should be touching the floor.",
            "Keep your arms straight but avoid locking your elbows.",
        ],
        modifications: [
            "For less intensity, keep your thighs on the floor.",
        ],
        benefits: [
            "Psoas",
            "Spine",
            "Chest",
            "Abdomen",
        ],
    },
    "Upward Frog": {
        name: "Upward Frog",
        imageStem: "r3_035_upward_frog",
        instructions: [
            "Start lying on your stomach with your legs extended and your hands under your shoulders.",
            "Slide one knee out to the side and bring your knee up to your hip.",
            "Press your palms into the floor, straightening your arms to lift your upper body off the ground.",
            "Lift your chest towards the ceiling, relax your shoulders, and look slightly upward.",
        ],
        tips: [
            "Keep your arms straight or keep a slight bend in your elbows.",
        ],
        modifications: [
            "For less intensity, keep your forearms on the floor.",
        ],
        benefits: [
            "Psoas",
            "Spine",
            "Chest",
            "Abdomen",
        ],
    },
    "Upward Salute": {
        name: "Upward Salute",
        imageStem: "r3_036_upward_salute",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Slowly sweep your arms out and up over your head.",
            "Keep your hands shoulder-width apart and reach toward the ceiling.",
            "Relax your shoulders and look slightly upward.",
        ],
        tips: [
            "Ground your feet firmly into the floor and distribute your weight evenly between your feet.",
            "Engage your core muscles to avoid arching your lower back.",
        ],
        modifications: [
            "For less intensity, place your hands behind your head or on your hips.",
        ],
        benefits: [
            "Spine",
            "Upper Back",
            "Obliques",
            "Shoulders",
            "Chest",
            "Lats",
            "Abdomen",
        ],
    },
    "V-Sit": {
        name: "V-Sit",
        imageStem: "r3_037_v-sit",
        instructions: [
            "Start lying on your back with your legs extended and your arms at your sides.",
            "Engage your core to simultaneously lift your arms, chest, and legs, forming a V-shape with your body.",
            "Keep your back straight, reach your arms up towards the ceiling, and hold the position.",
        ],
        tips: [
            "Try to balance on your the bones at the bottom of your pelvis.",
            "Keep your legs as straight as possible.",
        ],
        modifications: [
            "For less intensity, keep your knees bent or hands on the floor for support.",
        ],
        benefits: [
            "Abdomen",
        ],
    },
    "Wall Arms": {
        name: "Wall Arms",
        imageStem: "r3_038_wall_arms",
        instructions: [
            "Start from a standing position with your feet hip-width apart and the side of your shoulder against a wall.",
            "Keeping your feet in place, rotate your torso and reach back with your arm to place your palm against the wall at shoulder height.",
            "Keep your hand against the wall and rotate your torso back to face forward.",
        ],
        tips: [
            "Your knees, hips, and shoulders should be square and in line at the end of the movement.",
        ],
        modifications: [],
        benefits: [
            "Shoulders",
            "Chest",
            "Biceps",
        ],
    },
    "Wall Dog": {
        name: "Wall Dog",
        imageStem: "r3_039_wall_dog",
        instructions: [
            "Start from a standing position facing a wall, about an arm's length away.",
            "Place your hands on the wall at shoulder height and take a step back with both feet.",
            "Keep your arms and legs straight and lower your upper body towards the floor.",
        ],
        tips: [
            "Relax your neck and let your head hang between your arms.",
        ],
        modifications: [
            "If the stretch is too intense, bend your knees slightly and walk your feet closer to the wall.",
        ],
        benefits: [
            "Upper Back",
            "Shoulders",
            "Hamstrings",
            "Chest",
            "Lower Back",
        ],
    },
    "Wall Handstand": {
        name: "Wall Handstand",
        imageStem: "r3_040_wall_handstand",
        instructions: [
            "Start from a standing position facing a wall.",
            "Step forward with one foot and bend over to place your hands on the floor a half-arm's length from the wall.",
            "Keeping your arms straight and your head down, kick your back leg up followed quickly by your other leg, swinging your body upward so that your feet rest against the wall above you.",
            "Keep your arms extended and your body in a straight line and hold the position.",
        ],
        tips: [
            "The movement should be performed in a fluid, continuous motion.",
            "Practice the kick-up motion without going all the way up until you're comfortable.",
        ],
        modifications: [
            "Have a spotter stand to the side to assist you if needed.",
        ],
        benefits: [
            "Upper Back",
            "Shoulders",
            "Chest",
            "Abdomen",
        ],
    },
    "Wall Pecs": {
        name: "Wall Pecs",
        imageStem: "r3_041_wall_pecs",
        instructions: [
            "Start from a standing position in a open doorway or facing the outside corner of a wall.",
            "Place your palm and forearm against the wall at shoulder height, forming a 90-degree angle at your elbow.",
            "Step forward with one leg and and lean forward until you feel a stretch in your chest.",
        ],
        tips: [
            "Keep your shoulder blade pulled down and back.",
            "Keep your body upright and don't twist or lean to either side.",
        ],
        modifications: [
            "For less intensity, don't lean as far forward.",
        ],
        benefits: [
            "Shoulders",
            "Chest",
        ],
    },
    "Wall Pike": {
        name: "Wall Pike",
        imageStem: "r3_042_wall_pike",
        instructions: [
            "Start on your hands and knees in a tabletop position with your feet near a wall.",
            "Walk your feet up the wall until your body forms an L-shape.",
            "Keep your arms straight and your palms pressed into the floor and hold the position.",
        ],
        tips: [
            "Distribute your weight evenly between your hands.",
            "Keep your neck relaxed, with your head between your arms.",
        ],
        modifications: [
            "For less intensity, don't walk your feet as high up the wall.",
        ],
        benefits: [
            "Upper Back",
            "Shoulders",
            "Chest",
            "Abdomen",
        ],
    },
    "Wall Plank": {
        name: "Wall Plank",
        imageStem: "r3_043_wall_plank",
        instructions: [
            "Start on your hands and knees in a tabletop position with your feet near a wall.",
            "Walk your feet up the wall until your body is in a straight line, parallel to the floor.",
            "Keep your arms straight and your palms pressed into the floor and hold the position.",
        ],
        tips: [
            "Keep your core engaged to support your lower back.",
            "Distribute your weight evenly between your hands.",
        ],
        modifications: [
            "For less intensity, don't walk your feet as high up the wall.",
        ],
        benefits: [
            "Upper Back",
            "Shoulders",
            "Chest",
            "Abdomen",
        ],
    },
    "Wall Sit": {
        name: "Wall Sit",
        imageStem: "r3_044_wall_sit",
        instructions: [
            "Start from a standing position with your back against a wall and your feet shoulder width apart.",
            "Walk your feet forward to an arm's length away from the wall, then slide your body down until your thighs are parallel to the floor.",
            "Extend your arms straight out in front of you and hold the position.",
        ],
        tips: [
            "Keep your head and back flat against the wall and your knees in line with your toes.",
            "Keep your weight in your heels, not your toes.",
        ],
        modifications: [
            "For less intensity, don't lower your body down as far.",
        ],
        benefits: [
            "Calves",
            "Hamstrings",
            "Quadriceps",
            "Glutes",
        ],
    },
    "Warrior I": {
        name: "Warrior I",
        imageStem: "r3_045_warrior_i",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Step one foot back and turn it slightly outward at a 45-degree angle.",
            "Bend your front knee and raise your arms overhead, palms facing each other.",
            "Square your hips and chest towards the front foot and lengthen your spine.",
        ],
        tips: [
            "Press firmly through both feet, especially the outer edge of your back foot.",
            "Keep your front knee aligned with your toes and avoid letting it collapse inward.",
        ],
        modifications: [
            "If balance is an issue, place your hands on your hips.",
        ],
        benefits: [
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Chest",
            "Glutes",
        ],
    },
    "Warrior II": {
        name: "Warrior II",
        imageStem: "r3_046_warrior_ii",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Turn your front foot outward and bend your front knee while your back leg stays straight.",
            "Extend your arms out to the sides, parallel to the floor, with your palms facing down.",
        ],
        tips: [
            "Keep your shoulders relaxed and your chest open.",
            "Press firmly through both feet, especially the outer edge of your back foot.",
            "Keep your front knee aligned with your toes and avoid letting it collapse inward.",
        ],
        modifications: [
            "For less intensity, shorten your stance slightly and rest your hands on your hips.",
        ],
        benefits: [
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Chest",
            "Glutes",
        ],
    },
    "Warrior III": {
        name: "Warrior III",
        imageStem: "r3_047_warrior_iii",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms at your sides.",
            "Shift your weight onto one leg and extend your arms overhead, reaching forward.",
            "Lift your back leg off the ground and extend it straight behind you while lowering your torso parallel to the floor.",
            "Keep your hips square to the floor and your standing leg slightly bent.",
        ],
        tips: [
            "Focus on a point in front of you to help maintain balance.",
            "Engage your core to support your lower back and keep your body aligned.",
        ],
        modifications: [
            "If balancing is difficult, perform the pose with your hands on a wall or chair for support.",
            "If extending your arms overhead is uncomfortable, keep your hands clasped together in front of your chest.",
        ],
        benefits: [
            "Shoulders",
            "Hips",
            "Hamstrings",
            "Quadriceps",
            "Chest",
            "Glutes",
        ],
    },
    "Wheel Pose": {
        name: "Wheel Pose",
        imageStem: "r3_048_wheel_pose",
        instructions: [
            "Start lying on your back with your knees bent and your feet flat on the floor.",
            "Place your hands on the floor beside your ears with your fingers pointing towards your shoulders.",
            "Press through your feet to lift your hips and upper back off the floor, then push through your hands to lift your head and shoulders off the floor.",
            "Straighten your arms to lift your head further and form an arch with your body.",
        ],
        tips: [
            "Distribute your weight evenly between your hands and feet.",
            "Keep your knees aligned with your hips and feet.",
            "Keep your elbows close to your sides.",
        ],
        modifications: [
            "For less intensity, keep your head on the floor.",
        ],
        benefits: [
            "Psoas",
            "Spine",
            "Hips",
            "Quadriceps",
            "Chest",
            "Abdomen",
        ],
    },
    "Wide Leg Bend": {
        name: "Wide Leg Bend",
        imageStem: "r3_049_wide_leg_bend",
        instructions: [
            "Start from a standing position with your feet wide and your toes pointed forward.",
            "Keeping your back straight, hinge at your hips to bend forward, lowering your upper body toward your legs.",
            "Relax your head, neck, and arms and try to place your palms on the floor.",
        ],
        tips: [
            "Focus on lengthening your spine as you fold forward.",
            "Keep your legs straight but not locked.",
            "To deepen the stretch, grab your ankles and pull your head closer to the floor.",
        ],
        modifications: [
            "If you can't reach the floor, place your hands on your shins or blocks.",
        ],
        benefits: [
            "Groin",
            "Calves",
            "Hips",
            "Hamstrings",
            "Lower Back",
        ],
    },
    "Wide Leg Side Bend": {
        name: "Wide Leg Side Bend",
        imageStem: "r3_050_wide_leg_side_bend",
        instructions: [
            "Start from a standing position with your feet wider than shoulder-width apart and your arms at your sides.",
            "Reach one arm overhead and place your opposite hand on your thigh.",
            "Gently bend your torso to the side, extending your arm overhead.",
        ],
        tips: [
            "Maintain length in your spine throughout the movement.",
            "Engage your core to support your lower back.",
            "Breathe deeply and steadily to enhance the stretch.",
        ],
        modifications: [
            "For less intensity, keep your bend shallower or place your hand on your thigh for support.",
            "Perform the stretch near a wall for added balance if needed.",
        ],
        benefits: [
            "Spine",
            "Obliques",
            "Lower Back",
            "Lats",
            "Abdomen",
        ],
    },
    "Wide Leg Toe Touches": {
        name: "Wide Leg Toe Touches",
        imageStem: "r3_051_wide_leg_toe_touches",
        instructions: [
            "Start from a standing position with a wide stance and your hands in front of you.",
            "Bend at your waist and reach both hands toward one of your feet to touch your toes.",
            "Return to standing and repeat the movement on the other side, alternating dynamically.",
            "Move smoothly, focusing on a controlled movement.",
        ],
        tips: [
            "Engage your core to support your back and maintain balance.",
            "Keep your knees slightly bent to avoid overextending your hamstrings.",
        ],
        modifications: [
            "Touch your shins or knees if reaching your toes is difficult.",
        ],
        benefits: [
            "Calves",
            "Obliques",
            "Hips",
            "Hamstrings",
            "Core",
            "Lower Back",
        ],
    },
    "Wide Leg Torso Circles": {
        name: "Wide Leg Torso Circles",
        imageStem: "r3_052_wide_leg_torso_circles",
        instructions: [
            "Start from a standing position with a wide stance and your hands on your hips.",
            "Hinge at your hips and begin rotating your torso in a wide circular motion.",
            "Focus on keeping your movements controlled and fluid and switch sides at the halfway point.",
        ],
        tips: [
            "Engage your core to support your lower back.",
            "Keep your knees slightly bent to reduce pressure on your joints.",
        ],
        modifications: [
            "Perform smaller circles if the full range of motion feels uncomfortable.",
            "If balance is an issue, reduce the depth of your forward hinge.",
        ],
        benefits: [
            "Hips",
            "Hamstrings",
            "Core",
            "Lower Back",
        ],
    },
    "Wrist Circles": {
        name: "Wrist Circles",
        imageStem: "r3_053_wrist_circles",
        instructions: [
            "Start from a standing or seated position with your hands in front of your chest.",
            "Make circular motions with your wrists, rotating them slowly in one direction.",
            "Keep your elbows stationary as you move your wrists, focusing on a full range of motion.",
            "After completing several circles, reverse the direction and repeat the movement.",
        ],
        tips: [
            "Keep your movements controlled and smooth to avoid straining your wrists.",
        ],
        modifications: [
            "Rest your forearms on a table for added support.",
            "If you have wrist discomfort, perform the circles more slowly or reduce the range of motion.",
        ],
        benefits: [
            "Forearms",
            "Wrists",
            "Hands",
        ],
    },
    "Wrist Extension": {
        name: "Wrist Extension",
        imageStem: "r3_054_wrist_extension",
        instructions: [
            "Start on your hands and knees in a tabletop position, with your palms flat on the floor.",
            "Rotate your hands so your fingers are pointed towards your body.",
            "Walk your knees closer to your hands, then slowly lean back and lower your hips towards your heels, while keeping your palms pressed into the floor.",
        ],
        tips: [
            "Distribute your weight evenly across both palms.",
        ],
        modifications: [
            "If kneeling is uncomfortable, perform this stretch standing up with your hands on a table.",
        ],
        benefits: [
            "Forearms",
            "Wrists",
            "Fingers",
            "Hands",
        ],
    },
    "Wrist Extension I": {
        name: "Wrist Extension I",
        imageStem: "r3_055_wrist_extension_i",
        instructions: [
            "Start from a standing or seated position with one arm extended straight in front of you, palm facing forward and fingers pointing up.",
            "Use your other hand to gently pull back on your extended fingers, stretching the underside of your wrist and forearm.",
            "Keep your arm straight and your shoulder relaxed and maintain steady pressure on your fingers.",
        ],
        tips: [
            "Avoid locking your elbow by keeping a slight bend in the arm.",
        ],
        modifications: [
            "Rest your elbow on a table or surface for added support during the stretch.",
        ],
        benefits: [
            "Forearms",
            "Wrists",
            "Fingers",
            "Hands",
        ],
    },
    "Wrist Extension II": {
        name: "Wrist Extension II",
        imageStem: "r3_056_wrist_extension_ii",
        instructions: [
            "Start from a standing or seated position with one arm extended straight in front of you, palm facing forward and fingers pointing down.",
            "Use your other hand to gently pull back on your extended fingers, stretching the underside of your wrist and forearm.",
            "Keep your arm straight and your shoulder relaxed and maintain steady pressure on your fingers.",
        ],
        tips: [
            "Avoid locking your elbow by keeping a slight bend in the arm.",
        ],
        modifications: [
            "Rest your elbow on a table or surface for added support during the stretch.",
        ],
        benefits: [
            "Forearms",
            "Wrists",
            "Fingers",
            "Hands",
        ],
    },
    "Wrist Flexion": {
        name: "Wrist Flexion",
        imageStem: "r3_057_wrist_flexion",
        instructions: [
            "Start on your hands and knees in a tabletop position.",
            "Flip your hands so the tops of your hands are flat on the floor and your fingers are pointed towards your body.",
            "Walk your knees closer to your hands, then slowly lean back and lower your hips towards your heels, while keeping your hands pressed into the floor.",
        ],
        tips: [
            "Distribute your weight evenly across both hands.",
        ],
        modifications: [
            "If kneeling is uncomfortable, perform this stretch standing up with your hands on a table.",
        ],
        benefits: [
            "Forearms",
            "Wrists",
            "Fingers",
            "Hands",
        ],
    },
    "Wrist Flexion I": {
        name: "Wrist Flexion I",
        imageStem: "r3_058_wrist_flexion_i",
        instructions: [
            "Start from a standing or seated position with your arm extended straight in front of you, palm facing down and fingers pointing towards the floor.",
            "Use your other hand to gently press the back of your hand towards your body, stretching the top of your wrist and forearm.",
            "Keep your arm straight and your shoulder relaxed and maintain steady pressure on your hand.",
        ],
        tips: [
            "Avoid locking your elbow by keeping a slight bend in your arm.",
        ],
        modifications: [
            "Rest your elbow on a table or surface for added support during the stretch.",
        ],
        benefits: [
            "Forearms",
            "Wrists",
            "Hands",
        ],
    },
    "Zombie Walks": {
        name: "Zombie Walks",
        imageStem: "r3_059_zombie_walks",
        instructions: [
            "Start from a standing position with your feet hip-width apart and your arms extended straight in front of you.",
            "Lift one leg straight in front of you while keeping your torso upright and your knee straight.",
            "Lower your leg back to the floor and repeat with the opposite leg in a controlled, dynamic motion.",
        ],
        tips: [
            "Focus on engaging your leg muscles to keep the movement smooth.",
            "Keep your back straight and avoid leaning backward as you lift your leg.",
            "Move slowly and avoid snapping your knee as you lift.",
        ],
        modifications: [
            "Perform the movement with a smaller leg lift if flexibility is limited.",
            "Place your hands on your hips instead of extending them if shoulder discomfort occurs.",
            "Hold onto a wall for added balance if needed.",
        ],
        benefits: [
            "Hips",
            "Hamstrings",
            "Core",
        ],
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
    back_childs_pose:   "Child\'s Pose",
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
    const bendName = STRETCH_ID_TO_BEND_NAME[stretchId] ?? stretchId;
    return BEND_BY_NAME[bendName] ?? null;
}

export function getImageForStretchId(stretchId: string): ReturnType<typeof require> | null {
    const bendName = STRETCH_ID_TO_BEND_NAME[stretchId] ?? stretchId;
    const entry = BEND_BY_NAME[bendName];
    if (!entry) return null;
    return getBendImage(bendName);
}

/** Returns all stretch names available in the bend data set (257 stretches). */
export function getAllBendStretchNames(): string[] {
    return Object.keys(BEND_BY_NAME);
}

// ─── Bilateral stretch names ──────────────────────────────────────────────────
// Stretches that require distinct left and right sides.
// Used by the runner to split the timer into two equal halves.

const BEND_BILATERAL_NAMES: ReadonlySet<string> = new Set([
    "90/90",
    "Adductor Dips",
    "Adductor Rocks",
    "Airplane",
    "Ankle Circles",
    "Back Leg Raise",
    "Bent Over Calf",
    "Bicycle Crunch Hold",
    "Bird Dog",
    "Bird Dog Plank",
    "Bird Dogs",
    "Bridge Leg Lift",
    "Couch Stretch",
    "Cow Face",
    "Cross Leg Fold",
    "Cross Leg Side Bend",
    "Curtsy Lunge Hold",
    "Dead Bug",
    "Dead Bugs",
    "Deep Split Squat",
    "Double Knee Spinal Twist",
    "Double Pigeon",
    "Down Dog Split",
    "Dynamic Quad Stretch",
    "Dynamic Side Bends",
    "Eagle Arm",
    "Ear-to-Shoulder",
    "Elbow Plank Leg Lift",
    "Elbow Side Plank",
    "Elbow Side Plank Leg Lift",
    "Figure Four Twist",
    "Forearm Stretch",
    "Front Leg Raise",
    "Front Split",
    "Gate Opener",
    "Half Bow",
    "Half Moon",
    "Half-Kneeling Hip Hinge",
    "Hand Plank Leg Lift",
    "Hand Side Plank",
    "Hand Side Plank Leg Lift",
    "Hamstring Pulls",
    "Humble Warrior",
    "Hurdler",
    "Knee Circles",
    "Knee-to-Wall",
    "Kneeling Hip Circles",
    "Kneeling Hip Hinge",
    "Kneeling Psoas",
    "Kneeling Quad",
    "Kneeling Wrist Extension Circles",
    "Lateral Leg Swing",
    "Lateral Lunge",
    "Leaning 90/90",
    "Leaning Calf",
    "Leaning Figure Four",
    "Leg Lift",
    "Leg Swings",
    "Lizard Pose",
    "Lunge",
    "Lying Ankle Circles",
    "Lying Figure Four",
    "Lying Hamstring",
    "Lying Open Book",
    "Lying Quad Stretch",
    "Lying Side Leg Raise",
    "Modified Seated Twist",
    "Neck Laterals",
    "Neck Laterals (Standing)",
    "Neck Rotation",
    "One Arm Hug",
    "One Arm Hug (Standing)",
    "Overhead Reach",
    "Overhead Tricep",
    "Overhead Tricep (Standing)",
    "Peaceful Warrior",
    "Pigeon",
    "Pistol Squat Hold",
    "Quad Stretch",
    "Reverse Lunge",
    "Reverse Plank Leg Lift",
    "Reverse Shoulder",
    "Revolved Wide Leg Forward Fold",
    "Runner's Lunge Twist",
    "Scalene Stretch",
    "Scapula Stretch",
    "Scorpion",
    "Seated Figure Four",
    "Seated Knee Drops",
    "Seated Twist",
    "Shoulder Cross",
    "Shoulder Opener",
    "Side Bend",
    "Side Bend (Standing)",
    "Side Leg Raise",
    "Side Lunge",
    "Side Lunge Hold",
    "Single Arm Plank",
    "Single Knee-to-Chest",
    "Single Leg Calf Stretch",
    "Single Leg Deadlift",
    "Single Leg Glute Bridges",
    "Single Leg Shin Stretch",
    "Single Leg Stand",
    "Soleus Stretch",
    "Spiderman Push Up Hold",
    "Spinal Twist",
    "Split Lunge Hold",
    "Split Squat Twists",
    "Split Squats",
    "Standing Hip Openers",
    "Standing Lunge Twist",
    "Standing Quad",
    "Sumo Squat Twists",
    "Thread the Needle",
    "Toe Touch Twist",
    "Toe-to-Wall",
    "Towel Calf Stretch",
    "Tree Pose",
    "Triangle Pose",
    "Trunk Rotation",
    "Trunk Twist",
    "Twisted Sphinx",
    "Wall Pecs",
    "Warrior I",
    "Warrior II",
    "Warrior III",
    "Wide Leg Side Bend",
    "Wide Leg Toe Touches",
    "Wrist Circles",
    "Wrist Extension",
    "Wrist Extension I",
    "Wrist Extension II",
    "Wrist Flexion",
    "Wrist Flexion I",
]);

/**
 * Returns true if the stretch requires separate left and right sides.
 * Works for both curated stretch IDs (e.g. "hip_pigeon") and raw bend names (e.g. "Pigeon").
 */
export function isBilateralStretch(stretchId: string): boolean {
    const bendName = STRETCH_ID_TO_BEND_NAME[stretchId] ?? stretchId;
    return BEND_BILATERAL_NAMES.has(bendName);
}
