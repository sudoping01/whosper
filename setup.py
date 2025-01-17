from setuptools import setup, find_packages

setup(
    name="whosper",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "torch>=2.0.0",
        "librosa",
    ],
    dependency_links=[
        "git+https://github.com/huggingface/transformers.git@main#egg=transformers",
        "git+https://github.com/huggingface/peft.git@main#egg=peft",
    ],
    author="Seydou DIALLO",
    author_email="sudoping01@gmail.com",
    description="A Whisper-based Automatic Speech Recognition package",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/whisper_asr",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.7",
)