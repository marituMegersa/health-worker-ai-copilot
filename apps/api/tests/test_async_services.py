import pytest
import pytest_asyncio
from app.core.ai_agents import OllamaVLLMProvider, LangGraphAgenticPipeline

@pytest.mark.asyncio
async def test_ollama_vllm_provider():
    provider = OllamaVLLMProvider(model_name="llama3:8b")
    res = await provider.generate_completion("Test prompt")
    assert "vLLM/Ollama" in res

@pytest.mark.asyncio
async def test_langgraph_agentic_pipeline():
    provider = OllamaVLLMProvider()
    pipeline = LangGraphAgenticPipeline(provider)
    result = await pipeline.run_state_graph({"query": "Health evaluation"})
    assert result["compliance_status"] == "PASSED_ZERO_PHI_LEAKAGE"
