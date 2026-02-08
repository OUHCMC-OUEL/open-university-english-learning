import unittest
import sys
import os

def run_suite():
    loader = unittest.TestLoader()
    current_dir = os.path.dirname(os.path.abspath(__file__))
    test_dir = os.path.join(current_dir, "unit_test")

    suite = loader.discover(test_dir, pattern='test_*.py')
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == "__main__":
    exit_code = run_suite()
    print(f"Exit code: {exit_code}")
    sys.exit(exit_code)