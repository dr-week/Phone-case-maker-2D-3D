import importlib.util
from pathlib import Path
import unittest

MODULE = Path(__file__).parents[1] / "blender-addon" / "design_rules.py"
SPEC = importlib.util.spec_from_file_location("design_rules", MODULE)
rules = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(rules)

class DesignRuleTests(unittest.TestCase):
    def test_a73_dimensions(self):
        self.assertEqual((rules.PHONE["width"], rules.PHONE["height"], rules.PHONE["depth"]), (76.1, 163.7, 7.6))

    def test_default_wall_is_four_nozzle_widths(self):
        self.assertEqual(rules.extrusion_widths(rules.DEFAULT_WALL), 4)

    def test_default_dimensions(self):
        result = rules.dimensions()
        self.assertEqual(tuple(round(value, 2) for value in result["outer"]), (80.0, 167.6, 9.55))

    def test_rejects_underbuilt_profile(self):
        self.assertTrue(rules.warnings(0.8, 0.2))

    def test_default_profile_has_no_warnings(self):
        self.assertEqual(rules.warnings(rules.DEFAULT_WALL, rules.DEFAULT_CLEARANCE), [])

if __name__ == "__main__":
    unittest.main()
