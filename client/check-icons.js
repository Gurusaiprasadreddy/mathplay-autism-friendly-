import * as Icons from 'lucide-react';

const requiredIcons = ['CheckCircle', 'Eye', 'Heart', 'Brain', 'Puzzle', 'Monitor', 'Sparkles', 'Zap', 'Layers'];
const missing = requiredIcons.filter(icon => !Icons[icon]);

if (missing.length > 0) {
    console.error('Missing icons:', missing);
    process.exit(1);
} else {
    console.log('All icons found');
}
