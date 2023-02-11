from .models import Info
class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        fields = "__all__"
